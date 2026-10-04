import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonPlanDto, FindLessonPlanDto, UpdateLessonPlanDto, SectionInputDto, TaskQuestionType } from './dtos';
import { Transaction } from '@/core/decorators/transaction.decorator';
import { WordRepo, LessonPlanRepo, GameRepo, TaskRepo, LessonPlanVocabRepo, LessonPlanGrammarRepo, LessonPlanListeningRepo, LessonPlanWritingRepo, LessonPlanWarmupRepo, QuestionRepo, AnswerRepo, TaskQuestionRepo, QuestionAnswerRepo } from '@/repositories';
import { LessonPlanVocab, LessonPlanGrammar, LessonPlanListening, LessonPlanWriting, LessonPlanWarmup, Game, Task } from '@/entities';
import { In } from 'typeorm';
import { NSLessonPlan } from '@/common/enums';
import { QuestionType } from '@/common/enums/EQuestion';

interface SectionReference {
  refId?: string;
  refType?: NSLessonPlan.ELessonPlanType;
}

interface FlattenedSectionMap {
  vocab?: LessonPlanVocab;
  grammar?: LessonPlanGrammar;
  listening?: LessonPlanListening;
  writing?: LessonPlanWriting;
  warmup?: LessonPlanWarmup;
}

@Injectable()
export class LessonPlanService {
  constructor(
    private readonly repo: LessonPlanRepo,
    private readonly wordRepo: WordRepo,
    private readonly gameRepo: GameRepo,
    private readonly taskRepo: TaskRepo,
    private readonly vocabRepo: LessonPlanVocabRepo,
    private readonly grammarRepo: LessonPlanGrammarRepo,
    private readonly listeningRepo: LessonPlanListeningRepo,
    private readonly writingRepo: LessonPlanWritingRepo,
    private readonly warmupRepo: LessonPlanWarmupRepo,
    private readonly questionRepo: QuestionRepo,
    private readonly answerRepo: AnswerRepo,
    private readonly taskQuestionRepo: TaskQuestionRepo,
    private readonly questionAnswerRepo: QuestionAnswerRepo,
  ) {}

  async find(dto: FindLessonPlanDto) {
    const { pageSize, pageIndex } = dto;
    const [data, total] = await this.repo.findAndCount({
      select: {
        id: true,
        name: true,
        level: true,
        description: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        user: { id: true, name: true },
      },
      where: { isDeleted: false },
      order: { createdAt: 'DESC' },
      skip: (pageIndex ?? 1) - 1,
      take: pageSize,
      relations: { user: true },
    });

    const lpIds = data.map((lp) => lp.id);
    const sectionSelect = { id: true, lessonPlanId: true, refId: true, refType: true };

    const [vocabs, grammars, listenings, writings, warmups] = await Promise.all([
      lpIds.length ? this.vocabRepo.find({ where: { lessonPlanId: In(lpIds) }, select: sectionSelect }) : [],
      lpIds.length ? this.grammarRepo.find({ where: { lessonPlanId: In(lpIds) }, select: sectionSelect }) : [],
      lpIds.length ? this.listeningRepo.find({ where: { lessonPlanId: In(lpIds) }, select: sectionSelect }) : [],
      lpIds.length ? this.writingRepo.find({ where: { lessonPlanId: In(lpIds) }, select: sectionSelect }) : [],
      lpIds.length ? this.warmupRepo.find({ where: { lessonPlanId: In(lpIds) }, select: sectionSelect }) : [],
    ]);

    const sectionMap = new Map<string, FlattenedSectionMap>();

    for (const s of vocabs) {
      if (!sectionMap.has(s.lessonPlanId)) sectionMap.set(s.lessonPlanId, {});
      sectionMap.get(s.lessonPlanId)!.vocab = s;
    }
    for (const s of grammars) {
      if (!sectionMap.has(s.lessonPlanId)) sectionMap.set(s.lessonPlanId, {});
      sectionMap.get(s.lessonPlanId)!.grammar = s;
    }
    for (const s of listenings) {
      if (!sectionMap.has(s.lessonPlanId)) sectionMap.set(s.lessonPlanId, {});
      sectionMap.get(s.lessonPlanId)!.listening = s;
    }
    for (const s of writings) {
      if (!sectionMap.has(s.lessonPlanId)) sectionMap.set(s.lessonPlanId, {});
      sectionMap.get(s.lessonPlanId)!.writing = s;
    }
    for (const s of warmups) {
      if (!sectionMap.has(s.lessonPlanId)) sectionMap.set(s.lessonPlanId, {});
      sectionMap.get(s.lessonPlanId)!.warmup = s;
    }

    const allRefs: SectionReference[] = [];
    for (const sections of sectionMap.values()) {
      if (sections.warmup) allRefs.push(sections.warmup);
      if (sections.vocab) allRefs.push(sections.vocab);
      if (sections.grammar) allRefs.push(sections.grammar);
      if (sections.listening) allRefs.push(sections.listening);
      if (sections.writing) allRefs.push(sections.writing);
    }

    const gameIds = allRefs.filter((r) => r.refType === NSLessonPlan.ELessonPlanType.GAME && r.refId).map((r) => r.refId!);
    const taskIds = allRefs.filter((r) => r.refType === NSLessonPlan.ELessonPlanType.TASK && r.refId).map((r) => r.refId!);

    const [games, tasks] = await Promise.all([
      gameIds.length
        ? this.gameRepo.find({
            where: { id: In(gameIds) },
            select: { id: true, type: true },
          })
        : [],
      taskIds.length
        ? this.taskRepo.find({
            where: { id: In(taskIds) },
            select: { id: true, name: true },
          })
        : [],
    ]);

    const gameMap = new Map<string, Game>();
    for (const g of games) {
      gameMap.set(g.id, g);
    }

    const taskMap = new Map<string, Task>();
    for (const t of tasks) {
      taskMap.set(t.id, t);
    }

    const resolve = (ref?: SectionReference) => {
      if (!ref?.refId) return null;
      if (ref.refType === NSLessonPlan.ELessonPlanType.GAME) {
        return gameMap.get(ref.refId) ?? null;
      }
      return taskMap.get(ref.refId) ?? null;
    };

    const result = data.map((lp) => {
      const s = sectionMap.get(lp.id);
      let flattenedSections;
      if (!s) {
        flattenedSections = { warmUp: null, warmUpType: null, vocab: null, vocabType: null, grammar: null, grammarType: null, listening: null, listeningType: null, writing: null, writingType: null };
      } else {
        flattenedSections = {
          warmUp: resolve(s.warmup),
          warmUpType: s.warmup?.refType ?? null,
          vocab: resolve(s.vocab),
          vocabType: s.vocab?.refType ?? null,
          grammar: resolve(s.grammar),
          grammarType: s.grammar?.refType ?? null,
          listening: resolve(s.listening),
          listeningType: s.listening?.refType ?? null,
          writing: resolve(s.writing),
          writingType: s.writing?.refType ?? null,
        };
      }
      return {
        ...lp,
        ...flattenedSections,
      };
    });

    return { data: result, total };
  }

  private async handleSaveSection(
    lessonPlanId: string,
    input: SectionInputDto,
    repo: LessonPlanWarmupRepo | LessonPlanVocabRepo | LessonPlanGrammarRepo | LessonPlanListeningRepo | LessonPlanWritingRepo,
  ) {
    let refId: string | undefined;
    let refType: NSLessonPlan.ELessonPlanType | undefined;

    if (input.refId && input.refType) {
      refId = input.refId;
      refType = input.refType;
    } else if (input.words?.length && input.gameType) {
      const game = await this.gameRepo.save(
        this.gameRepo.create({
          type: input.gameType,
        }),
      );

      const words = input.words.map((w) =>
        this.wordRepo.create({
          words: w.word,
          audio: w.audio,
          phoneticText: w.phonetic,
          definition: w.definition,
          gameId: game.id,
        }),
      );
      await this.wordRepo.save(words);

      refId = game.id;
      refType = NSLessonPlan.ELessonPlanType.GAME;
    } else if (input.taskName) {
      const task = await this.taskRepo.save(
        this.taskRepo.create({
          name: input.taskName,
        }),
      );

      if (input.words?.length) {
        const words = input.words.map((w) =>
          this.wordRepo.create({
            words: w.word,
            audio: w.audio,
            phoneticText: w.phonetic,
            definition: w.definition,
            taskId: task.id,
          }),
        );
        await this.wordRepo.save(words);
      }

      if (input.taskType === TaskQuestionType.MULTIPLE_CHOICE && input.questions?.length) {
        for (const q of input.questions) {
          const answerGroupId = crypto.randomUUID();

          const correctAnswer = await this.answerRepo.save(
            this.answerRepo.create({ answer: q.correctAnswer, isRight: true }),
          );

          const wrongAnswers = (q.wrongAnswers ?? []).map((wa) =>
            this.answerRepo.create({ answer: wa, isRight: false }),
          );
          const savedWrongAnswers = wrongAnswers.length ? await this.answerRepo.save(wrongAnswers) : [];

          const question = await this.questionRepo.save(
            this.questionRepo.create({
              question: q.question,
              answerGroupId,
              type: QuestionType.MULTIPLE_CHOICE,
              key: q.correctAnswer,
            }),
          );

          const allAnswers = [correctAnswer, ...savedWrongAnswers];
          const questionAnswers = allAnswers.map((a) =>
            this.questionAnswerRepo.create({
              answerId: a.id,
              questionId: question.id,
            }),
          );
          await this.questionAnswerRepo.save(questionAnswers);

          await this.taskQuestionRepo.save(
            this.taskQuestionRepo.create({
              taskId: task.id,
              questionId: question.id,
            }),
          );
        }
      }

      refId = task.id;
      refType = NSLessonPlan.ELessonPlanType.TASK;
    }

    if (refId && refType) {
      await repo.save(
        repo.create({
          lessonPlanId,
          refId,
          refType,
        }),
      );
    }
  }

  @Transaction()
  async create(dto: CreateLessonPlanDto) {
    try {
      // 1. Xử lý lưu thông tin chung giáo án (Tên, Cấp độ, Mô tả, Giáo viên)
      const lp = this.repo.create({
        name: dto.name,
        level: dto.level,
        description: dto.description,
        userId: dto.userId,
      });
      const saved = await this.repo.save(lp);

      // 2. Xử lý lưu phần mở đầu (Warm-up)
      if (dto.warmUp) {
        await this.handleSaveSection(saved.id, dto.warmUp, this.warmupRepo);
      }

      // 3. Xử lý lưu phần từ vựng (Vocabulary)
      if (dto.vocab) {
        await this.handleSaveSection(saved.id, dto.vocab, this.vocabRepo);
      }

      // 4. Xử lý lưu phần ngữ pháp (Grammar)
      if (dto.grammar) {
        await this.handleSaveSection(saved.id, dto.grammar, this.grammarRepo);
      }

      // 5. Xử lý lưu phần nghe (Listening)
      if (dto.listening) {
        await this.handleSaveSection(saved.id, dto.listening, this.listeningRepo);
      }

      // 6. Xử lý lưu phần viết (Writing)
      if (dto.writing) {
        await this.handleSaveSection(saved.id, dto.writing, this.writingRepo);
      }

      return { message: 'Lesson plan created successfully', data: saved };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }


  async getDetail(id: string) {
    const lessonPlan = await this.repo.findOne({
      where: { id, isDeleted: false },
      relations: { user: true },
      select: {
        id: true,
        name: true,
        description: true,
        level: true,
        createdAt: true,
        updatedAt: true,
        user: { id: true, name: true },
      },
    });
    if (!lessonPlan) throw new NotFoundException('LessonPlan not found');

    const lpIds = [id];
    const sectionSelect = { id: true, lessonPlanId: true, refId: true, refType: true };

    const [vocabs, grammars, listenings, writings, warmups] = await Promise.all([
      lpIds.length ? this.vocabRepo.find({ where: { lessonPlanId: In(lpIds) }, select: sectionSelect }) : [],
      lpIds.length ? this.grammarRepo.find({ where: { lessonPlanId: In(lpIds) }, select: sectionSelect }) : [],
      lpIds.length ? this.listeningRepo.find({ where: { lessonPlanId: In(lpIds) }, select: sectionSelect }) : [],
      lpIds.length ? this.writingRepo.find({ where: { lessonPlanId: In(lpIds) }, select: sectionSelect }) : [],
      lpIds.length ? this.warmupRepo.find({ where: { lessonPlanId: In(lpIds) }, select: sectionSelect }) : [],
    ]);

    const sectionMap = new Map<string, FlattenedSectionMap>();

    for (const s of vocabs) {
      if (!sectionMap.has(s.lessonPlanId)) sectionMap.set(s.lessonPlanId, {});
      sectionMap.get(s.lessonPlanId)!.vocab = s;
    }
    for (const s of grammars) {
      if (!sectionMap.has(s.lessonPlanId)) sectionMap.set(s.lessonPlanId, {});
      sectionMap.get(s.lessonPlanId)!.grammar = s;
    }
    for (const s of listenings) {
      if (!sectionMap.has(s.lessonPlanId)) sectionMap.set(s.lessonPlanId, {});
      sectionMap.get(s.lessonPlanId)!.listening = s;
    }
    for (const s of writings) {
      if (!sectionMap.has(s.lessonPlanId)) sectionMap.set(s.lessonPlanId, {});
      sectionMap.get(s.lessonPlanId)!.writing = s;
    }
    for (const s of warmups) {
      if (!sectionMap.has(s.lessonPlanId)) sectionMap.set(s.lessonPlanId, {});
      sectionMap.get(s.lessonPlanId)!.warmup = s;
    }

    const s = sectionMap.get(id);

    const allRefs: SectionReference[] = [];
    if (s) {
      if (s.warmup) allRefs.push(s.warmup);
      if (s.vocab) allRefs.push(s.vocab);
      if (s.grammar) allRefs.push(s.grammar);
      if (s.listening) allRefs.push(s.listening);
      if (s.writing) allRefs.push(s.writing);
    }
    
    const gameIds = allRefs.filter((r) => r.refType === NSLessonPlan.ELessonPlanType.GAME && r.refId).map((r) => r.refId!);
    const taskIds = allRefs.filter((r) => r.refType === NSLessonPlan.ELessonPlanType.TASK && r.refId).map((r) => r.refId!);

    const wordSelect = { id: true, words: true, definition: true, phoneticText: true, audio: true };

    const [games, tasks] = await Promise.all([
      gameIds.length
        ? this.gameRepo.find({
            where: { id: In(gameIds) },
            relations: { words: true }, 
            select: { id: true, type: true, words: wordSelect },
          })
        : [],
      taskIds.length
        ? this.taskRepo.find({
            where: { id: In(taskIds) },
            relations: {
              words: true,
              taskQuestions: {
                question: {
                  questionAnswers: {
                    answer: true,
                  },
                },
              },
            },
            select: {
              id: true,
              name: true,
              words: wordSelect,
              taskQuestions: {
                id: true,
                question: {
                  id: true,
                  question: true,
                  type: true,
                  key: true,
                  questionAnswers: {
                    id: true,
                    answer: {
                      id: true,
                      answer: true,
                      isRight: true,
                    },
                  },
                },
              },
            },
          })
        : [],
    ]);

    const gameMap = new Map<string, Game>();
    for (const g of games) {
      gameMap.set(g.id, g);
    }

    const taskMap = new Map<string, Task>();
    for (const t of tasks) {
      taskMap.set(t.id, t);
    }

    const resolve = (ref?: SectionReference) => {
      if (!ref?.refId) return null;

      if (ref.refType === NSLessonPlan.ELessonPlanType.GAME) {
        return gameMap.get(ref.refId) ?? null;
      }

      const task = taskMap.get(ref.refId);
      if (!task) return null;

      if (task.taskQuestions?.length) {
        const questions = task.taskQuestions.map((tq) => ({
          id: tq.question?.id,
          question: tq.question?.question,
          type: tq.question?.type,
          key: tq.question?.key,
          answers: (tq.question?.questionAnswers ?? []).map((qa) => ({
            id: qa.answer?.id,
            answer: qa.answer?.answer,
            isRight: qa.answer?.isRight,
          })),
        }));
        return {
          ...task,
          questions,
        };
      }

      return task;
    };
    
    let flattenedSections;
    if (!s) {
      flattenedSections = { warmUp: null, warmUpType: null, vocab: null, vocabType: null, grammar: null, grammarType: null, listening: null, listeningType: null, writing: null, writingType: null };
    } else {
      flattenedSections = {
        warmUp: resolve(s.warmup),
        warmUpType: s.warmup?.refType ?? null,
        vocab: resolve(s.vocab),
        vocabType: s.vocab?.refType ?? null,
        grammar: resolve(s.grammar),
        grammarType: s.grammar?.refType ?? null,
        listening: resolve(s.listening),
        listeningType: s.listening?.refType ?? null,
        writing: resolve(s.writing),
        writingType: s.writing?.refType ?? null,
      };
    }

    return {
      ...lessonPlan,
      ...flattenedSections,
    };
  }

  @Transaction()
  async update(dto: UpdateLessonPlanDto) {
    const e = await this.repo.findOne({
      where: { id: dto.id, isDeleted: false },
      select: { id: true, level: true, description: true, name: true },
    });
    if (!e) throw new NotFoundException('LessonPlan not found');

    if (dto.level !== undefined) e.level = dto.level;
    if (dto.description !== undefined) e.description = dto.description;
    if (dto.name !== undefined) e.name = dto.name;
    await this.repo.save(e);

    const upsertSection = async (
      repo: LessonPlanVocabRepo | LessonPlanGrammarRepo | LessonPlanListeningRepo | LessonPlanWritingRepo | LessonPlanWarmupRepo,
      sectionDto?: { refId?: string; refType?: NSLessonPlan.ELessonPlanType },
    ) => {
      const existing = await repo.find({
        where: { lessonPlanId: dto.id },
        select: { id: true, lessonPlanId: true },
      });
      if (existing.length) {
        await repo.remove(existing);
      }
      if (sectionDto?.refId) {
        await repo.save(
          repo.create({
            lessonPlanId: dto.id,
            refId: sectionDto.refId,
            refType: sectionDto.refType,
          }),
        );
      }
    };

    await Promise.all(
      [
        dto.warmUp !== undefined && upsertSection(this.warmupRepo, dto.warmUp),
        dto.vocab !== undefined && upsertSection(this.vocabRepo, dto.vocab),
        dto.grammar !== undefined && upsertSection(this.grammarRepo, dto.grammar),
        dto.listening !== undefined && upsertSection(this.listeningRepo, dto.listening),
        dto.writing !== undefined && upsertSection(this.writingRepo, dto.writing),
      ].filter(Boolean),
    );

    return this.repo.findOne({
      where: { id: dto.id, isDeleted: false },
      select: { id: true, name: true, level: true, description: true, updatedAt: true },
    });
  }

  @Transaction()
  async remove(id: string) {
    const e = await this.repo.findOne({
      where: { id, isDeleted: false },
      select: { id: true, isDeleted: true },
    });
    if (!e) throw new NotFoundException('LessonPlan not found');
    e.isDeleted = true;
    await this.repo.save(e);
    return { success: true };
  }
}
