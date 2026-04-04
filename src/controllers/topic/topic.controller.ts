import { Topic } from "@/entities";
import { TopicService } from "@/services/topic/topic.service";
import { Body, Controller, Delete, Get, Patch, Post, Put, UploadedFiles, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from "@nestjs/swagger";
import { Param } from "@nestjs/common";
import { CreateTopicDto, UpdateTopicDto } from "@/shared/dtos/topic.dto";
import { FileFieldsInterceptor } from "@nestjs/platform-express";

@ApiTags("Topics")
@Controller("topics")
export class TopicController {
    constructor(private readonly topicService: TopicService) {}

    @Get()
    @ApiOperation({
        summary: "Get all topics",
    })
    findAll(): Promise<Topic[]> {
        return this.topicService.findAllTopics();
    }

    @Get("/:id/id")
    @ApiOperation({
        summary: "Get topic by ID",
    })
    findById(@Param("id") id: string): Promise<Topic | null> {
        return this.topicService.findTopicById(id);
    }

    @Post()
    @ApiOperation({
        summary: "Create a new topic",
    })
    @ApiBody({ type: CreateTopicDto })
    @UseInterceptors(FileFieldsInterceptor([{ name: "imageURL", maxCount: 1 }]))
    @ApiConsumes("multipart/form-data")
    createTopic(@Body() topic: CreateTopicDto, @UploadedFiles() files: { imageURL?: Express.Multer.File[] }): Promise<Topic> {
        if (files?.imageURL && files.imageURL.length > 0) {
            topic.imageURL = files.imageURL[0];
        }
        return this.topicService.createTopic(topic);
    }

    @Patch("/:id")
    @ApiOperation({
        summary: "Update topic by ID",
    })
    @ApiBody({ type: UpdateTopicDto })
    @UseInterceptors(FileFieldsInterceptor([{ name: "imageURL", maxCount: 1 }]))
    @ApiConsumes("multipart/form-data")
    updateTopic(@Param("id") id: string,@Body() topic: UpdateTopicDto, @UploadedFiles() files: { imageURL?: Express.Multer.File[] }): Promise<Topic> {
        if (files?.imageURL && files.imageURL.length > 0) {
            topic.imageURL = files.imageURL[0];
        }
        return this.topicService.updateTopic(id, topic);
    }

    @Delete("/:id")
    @ApiOperation({
        summary: "Delete a topic by ID",
    })
    deleteTopic(@Param("id") id: string): Promise<void> {
        return this.topicService.deleteTopic(id);
    }
}
