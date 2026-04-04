import { TopicWordRepository } from "./topic-word.repository";
import { DataSource, Repository } from "typeorm";
import { Topic } from "@/entities";
import { TopicStatus } from "@/shared/enums/topic.enum";
import { InjectDataSource } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { CreateTopicDto, UpdateTopicDto } from "@/shared/dtos/topic.dto";
import { CloudinaryService } from "@/services/cloudinary/cloudinary.service";
import { CreateTopicWordDto } from "@/shared/dtos/topic-word.dto";

@Injectable()
export class TopicRepository extends Repository<Topic> {
    constructor(
        @InjectDataSource() private readonly dataSource: DataSource,
        private readonly cloudinaryService: CloudinaryService,
        private readonly topicWordRepository: TopicWordRepository
    ) {
        super(Topic, dataSource.createEntityManager());
    }
    async findById(id: string): Promise<Topic | null> {
        return this.findOne({ where: { id }, relations: ["topicWords", "topicWords.word", "topicWords.word.entries"] });
    }
    async findAllTopics(): Promise<Topic[]> {
        return this.find({ order: { createdAt: "DESC" }, relations: ["topicWords", "topicWords.word", "topicWords.word.entries"] });
    }
    async createTopic(topic: CreateTopicDto): Promise<Topic> {
        let newImage = "";
        console.log(topic.wordIds);

        if (topic.imageURL) {
            const result = await this.cloudinaryService.uploadFile(topic.imageURL);
            newImage = result.secure_url;
        }

        const savedTopic = await this.save({
            topicName: topic.topicName,
            description: topic.description,
            imageURL: newImage,
            status: TopicStatus.ACTIVE,
        });

        if (topic.wordIds && topic.wordIds.length > 0) {
            await Promise.all(
                topic.wordIds.map(async (wordId) => {
                    const newTopicWord = new CreateTopicWordDto();
                    newTopicWord.topicId = savedTopic.id;
                    newTopicWord.wordId = wordId;
                    await this.topicWordRepository.createTopicWord(newTopicWord);
                })
            );
        }
        return savedTopic;
    }

    async updateTopic(id: string, topic: UpdateTopicDto): Promise<Topic> {
        const existingTopic = await this.findById(id);
        if (!existingTopic) {
            throw new Error("Topic not found");
        }

        let newImage = "";
        if (topic.imageURL || topic.isDeleteAvatar) {
            if (existingTopic.imageURL) {
                await this.cloudinaryService.deleteImageByUrl(existingTopic.imageURL);
            }
        }
        if (topic.imageURL) {
            const result = await this.cloudinaryService.uploadFile(topic.imageURL);
            newImage = result.secure_url;
        }
        if (topic.topicName) {
            this.merge(existingTopic, {
                topicName: topic.topicName,
            });
        }
        if (topic.description) {
            this.merge(existingTopic, {
                description: topic.description,
            });
        }
        this.merge(existingTopic, {
            imageURL: topic.isDeleteAvatar === true ? "" : !!newImage ? newImage : existingTopic.imageURL,
        });

        return this.save(existingTopic);
    }

    async deleteTopic(id: string): Promise<void> {
        const existingTopic = await this.findById(id);
        if (!existingTopic) {
            throw new Error("Topic not found");
        }
        if (existingTopic.imageURL) {
            await this.cloudinaryService.deleteImageByUrl(existingTopic.imageURL);
        }
        await Promise.all(existingTopic.topicWords.map((tw) => this.topicWordRepository.remove(tw)));
        await this.remove(existingTopic);
    }
}
