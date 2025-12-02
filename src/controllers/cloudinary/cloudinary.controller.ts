import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '@/services/cloundinary/cloudinary.service';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';

@Controller('upload')
export class UploadController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}


@Post('image')
@ApiOperation({ summary: 'Upload an image to Cloudinary' })
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      file: {
        type: 'string',
        format: 'binary',
      },
    },
    required: ['file'],
  },
})
@UseInterceptors(FileInterceptor('file'))
async uploadImage(@UploadedFile() file: Express.Multer.File) {
  if (!file) throw new BadRequestException('File is required');
  const result = await this.cloudinaryService.uploadFile(file);
  return {
    message: 'Upload successful',
    url: result.secure_url,
    public_id: result.public_id,
  };
}
}