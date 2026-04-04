import { BadRequestException, Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  uploadFile(file: Express.Multer.File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'nestjs_upload', // Tên thư mục trên Cloudinary
          // resource_type: 'auto', // Tự động nhận diện ảnh/video
        },
        (error, result) => {
          if (error) return reject(new Error(error.message || 'Upload failed'));
          resolve(result);
        },
      );

      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }


  private extractPublicIdFromUrl(url: string): string | null {
    const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-zA-Z]+$/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  async deleteImageByUrl(imageUrl: string): Promise<any> {
    const publicId = this.extractPublicIdFromUrl(imageUrl);

    if (!publicId) {
        throw new BadRequestException('URL ảnh không hợp lệ');
    }

    try {
        const result = await cloudinary.uploader.destroy(publicId, {
          invalidate: true, // Ép xóa cache CDN ngay lập tức
          resource_type: 'image' // Khai báo rõ là xóa ảnh
      });
        return result;
    } catch (error) {
        throw new Error(`Lỗi xóa ảnh: ${error.message}`);
    }
}

}

