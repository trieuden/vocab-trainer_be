import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLessonPlanDto, FindLessonPlanDto, UpdateLessonPlanDto, SectionInputDto, MultipleChoiceQuestionDto, TaskQuestionType } from './dtos';
import { Transaction } from '@/core/decorators/transaction.decorator';
import { WordRepo, LessonPlanRepo, GameRepo, TaskRepo, LessonPlanVocabRepo, LessonPlanGrammarRepo, LessonPlanListeningRepo, LessonPlanWritingRepo, LessonPlanWarmupRepo, QuestionRepo, AnswerRepo, TaskQuestionRepo, QuestionAnswerRepo } from '@/repositories';
import { LessonPlanVocab, LessonPlanGrammar, LessonPlanListening, LessonPlanWriting, LessonPlanWarmup } from '@/entities';
import { In } from 'typeorm';
import { NSLessonPlan } from '@/common/enums';
import { GameType } from '@/common/enums/EGame';
import { QuestionType } from '@/common/enums/EQuestion';

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

  private async loadSections(lpIds: string[]) {
    const [vocabs, grammars, listenings, writings, warmups] = await Promise.all([
      lpIds.length ? this.vocabRepo.find({ where: { lessonPlanId: In(lpIds) } }) : [],
      lpIds.length ? this.grammarRepo.find({ where: { lessonPlanId: In(lpIds) } }) : [],
      lpIds.length ? this.listeningRepo.find({ where: { lessonPlanId: In(lpIds) } }) : [],
      lpIds.length ? this.writingRepo.find({ where: { lessonPlanId: In(lpIds) } }) : [],
      lpIds.length ? this.warmupRepo.find({ where: { lessonPlanId: In(lpIds) } }) : [],
    ]);

    const sectionMap = new Map<
      string,
      {
        vocab?: LessonPlanVocab;
        grammar?: LessonPlanGrammar;
        listening?: LessonPlanListening;
        writing?: LessonPlanWriting;
        warmup?: LessonPlanWarmup;
      }
    >();

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

    return sectionMap;
  }

  private async resolveRef(refs: { refId?: string; refType?: NSLessonPlan.ELessonPlanType }[], withWords = false) {
    const gameIds = refs.filter((r) => r.refType === NSLessonPlan.ELessonPlanType.GAME && r.refId).map((r) => r.refId!);
    const taskIds = refs.filter((r) => r.refType === NSLessonPlan.ELessonPlanType.TASK && r.refId).map((r) => r.refId!);

    const wordSelect = { id: true, words: true, definition: true, phoneticText: true, audio: true };

    const [games, tasks] = await Promise.all([
      gameIds.length
        ? this.gameRepo.find({
            where: { id: In(gameIds) },
            ...(withWords ? { relations: { words: true }, select: { id: true, type: true, words: wordSelect } } : {}),
          })
        : [],
      taskIds.length
        ? this.taskRepo.find({
            where: { id: In(taskIds) },
            ...(withWords
              ? {
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
                }
              : {}),
          })
        : [],
    ]);

    const gameMap = new Map<string, any>(games.map((g) => [g.id, g] as const));
    const taskMap = new Map<string, any>(tasks.map((t) => [t.id, t] as const));

    return (ref?: { refId?: string; refType?: NSLessonPlan.ELessonPlanType }) => {
      if (!ref?.refId) return null;

      if (ref.refType === NSLessonPlan.ELessonPlanType.GAME) {
        return gameMap.get(ref.refId) ?? null;
      }

      const task = taskMap.get(ref.refId);
      if (!task) return null;

      if (withWords && task.taskQuestions?.length) {
        task.questions = task.taskQuestions.map((tq: any) => ({
          id: tq.question.id,
          question: tq.question.question,
          type: tq.question.type,
          key: tq.question.key,
          answers: (tq.question.questionAnswers ?? []).map((qa: any) => ({
            id: qa.answer.id,
            answer: qa.answer.answer,
            isRight: qa.answer.isRight,
          })),
        }));
      }

      return task;
    };
  }

  private flattenSections(lpId: string, sectionMap: Map<string, any>, resolve: (ref?: any) => any) {
    const s = sectionMap.get(lpId);
    if (!s) {
      return { warmUp: null, warmUpType: null, vocab: null, vocabType: null, grammar: null, grammarType: null, listening: null, listeningType: null, writing: null, writingType: null };
    }

    return {
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

  async find(dto: FindLessonPlanDto) {
    const { pageSize, pageIndex } = dto;
    const [data, total] = await this.repo.findAndCount({
      where: { isDeleted: false },
      order: { createdAt: 'DESC' },
      skip: (pageIndex ?? 1) - 1,
      take: pageSize,
      relations: { user: true },
    });

    const lpIds = data.map((lp) => lp.id);
    const sectionMap = await this.loadSections(lpIds);

    const allRefs: { refId?: string; refType?: NSLessonPlan.ELessonPlanType }[] = [];
    for (const sections of sectionMap.values()) {
      if (sections.warmup) allRefs.push(sections.warmup);
      if (sections.vocab) allRefs.push(sections.vocab);
      if (sections.grammar) allRefs.push(sections.grammar);
      if (sections.listening) allRefs.push(sections.listening);
      if (sections.writing) allRefs.push(sections.writing);
    }
    const resolve = await this.resolveRef(allRefs);

    const result = data.map((lp) => ({
      ...lp,
      ...this.flattenSections(lp.id, sectionMap, resolve),
    }));

    return { data: result, total };
  }

  private async createSection(lessonPlanId: string, section?: SectionInputDto): Promise<{ refId: string; refType: NSLessonPlan.ELessonPlanType } | null> {
    if (!section) return null;

    if (section.refId && section.refType) {
      return { refId: section.refId, refType: section.refType };
    }

    if (section.words?.length && section.gameType) {
      const game = await this.gameRepo.save(
        this.gameRepo.create({
          type: section.gameType,
          parentId: undefined,
        }),
      );
      const words = section.words.map((w) =>
        this.wordRepo.create({
          words: w.word,
          audio: w.audio,
          phoneticText: w.phonetic,
          definition: w.definition,
          gameId: game.id,
        }),
      );
      await this.wordRepo.save(words);
      return { refId: game.id, refType: NSLessonPlan.ELessonPlanType.GAME };
    }

    if (section.taskName) {
      const task = await this.taskRepo.save(
        this.taskRepo.create({
          name: section.taskName,
          parentId: undefined,
        }),
      );

      if (section.words?.length) {
        const words = section.words.map((w) =>
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

      if (section.taskType === TaskQuestionType.MULTIPLE_CHOICE && section.questions?.length) {
        for (const q of section.questions) {
          const answerGroupId = crypto.randomUUID();

          const correctAnswer = await this.answerRepo.save(
            this.answerRepo.create({ answer: q.correctAnswer, isRight: true }),
          );

          const wrongAnswers = (q.wrongAnswers ?? []).map((wa) =>
            this.answerRepo.create({ answer: wa, isRight: false }),
          );
          const savedWrongAnswers = wrongAnswers.length
            ? await this.answerRepo.save(wrongAnswers)
            : [];

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

      return { refId: task.id, refType: NSLessonPlan.ELessonPlanType.TASK };
    }

    return null;
  }

  @Transaction()
  async create(dto: CreateLessonPlanDto) {
    try {
      const lp = this.repo.create({
        name: dto.name,
        level: dto.level,
        description: dto.description,
        userId: dto.userId,
      });
      const saved = await this.repo.save(lp);

      const sections = [
        { input: dto.warmUp, repo: this.warmupRepo },
        { input: dto.vocab, repo: this.vocabRepo },
        { input: dto.grammar, repo: this.grammarRepo },
        { input: dto.listening, repo: this.listeningRepo },
        { input: dto.writing, repo: this.writingRepo },
      ];

      for (const { input, repo } of sections) {
        const ref = await this.createSection(saved.id, input);
        if (ref) {
          await repo.save(
            repo.create({
              lessonPlanId: saved.id,
              refId: ref.refId,
              refType: ref.refType,
            }),
          );
        }
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
        description: true,
        level: true,
        user: { id: true, name: true },
      },
    });
    if (!lessonPlan) throw new NotFoundException('LessonPlan not found');

    const sectionMap = await this.loadSections([id]);
    const s = sectionMap.get(id);

    const allRefs: { refId?: string; refType?: NSLessonPlan.ELessonPlanType }[] = [];
    if (s) {
      if (s.warmup) allRefs.push(s.warmup);
      if (s.vocab) allRefs.push(s.vocab);
      if (s.grammar) allRefs.push(s.grammar);
      if (s.listening) allRefs.push(s.listening);
      if (s.writing) allRefs.push(s.writing);
    }
    const resolve = await this.resolveRef(allRefs, true);

    return {
      ...lessonPlan,
      ...this.flattenSections(id, sectionMap, resolve),
    };
  }

  @Transaction()
  async update(id: string, dto: UpdateLessonPlanDto) {
    const e = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!e) throw new NotFoundException('LessonPlan not found');

    if (dto.level !== undefined) e.level = dto.level;
    if (dto.description !== undefined) e.description = dto.description;
    await this.repo.save(e);

    const upsertSection = async (
      repo: LessonPlanVocabRepo | LessonPlanGrammarRepo | LessonPlanListeningRepo | LessonPlanWritingRepo | LessonPlanWarmupRepo,
      sectionDto?: { refId?: string; refType?: NSLessonPlan.ELessonPlanType },
    ) => {
      const existing = await repo.find({ where: { lessonPlanId: id } });
      if (existing.length) {
        await repo.remove(existing);
      }
      if (sectionDto?.refId) {
        await repo.save(
          repo.create({
            lessonPlanId: id,
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

    return this.repo.findOne({ where: { id } });
  }

  @Transaction()
  async remove(id: string) {
    const e = await this.repo.findOne({ where: { id, isDeleted: false } });
    if (!e) throw new NotFoundException('LessonPlan not found');
    e.isDeleted = true;
    await this.repo.save(e);
  }
}
