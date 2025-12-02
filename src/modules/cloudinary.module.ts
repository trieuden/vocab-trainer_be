import { Module } from '@nestjs/common';
import { CloudinaryService } from '@/services/cloundinary/cloudinary.service';
import { CloudinaryProvider } from '@/repositories/cloudinary.provider';
import { UploadController } from '@/controllers/cloudinary/cloudinary.controller';

@Module({
  providers: [CloudinaryProvider, CloudinaryService],
  controllers: [UploadController],
  exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}