import {
  DeleteObjectCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private logger = new Logger(S3Service.name);
  private region: string;
  private bucket: string;
  private s3: S3Client;

  constructor(private configService: ConfigService) {
    this.bucket = this.configService.get<string>('S3_BUCKET');
    this.region = this.configService.get<string>('S3_REGION');
    this.s3 = new S3Client({
      region: this.region,
      credentials: {
        accessKeyId: this.configService.get<string>('S3_ACCESSKEYID'),
        secretAccessKey: this.configService.get<string>('S3_SECRETACCESSKEY'),
      },
    });
  }
  async uploadFile(file: Express.Multer.File, key: string) {
    const input: PutObjectCommandInput = {
      Body: file.buffer,
      Bucket: this.bucket,
      Key: key,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };
    try {
      const response: PutObjectCommandOutput = await this.s3.send(
        new PutObjectCommand(input),
      );
      if (response.$metadata.httpStatusCode === 200) {
        return `http://${this.bucket}.s3.${this.region}.amazonaws.com/${key}`;
      }
      throw new HttpException(`Image not saved to s3!`, HttpStatus.BAD_REQUEST);
    } catch (error) {
      this.logger.error('Cannot save file inside s3', error);
      throw new HttpException(
        `Cannot save file inside s3`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async deleteFile(key: string) {
    const params = {
      Bucket: this.bucket,
      Key: key,
    };
    try {
      await this.s3.send(new DeleteObjectCommand(params));
    } catch (error) {
      this.logger.error('Cannot save file inside s3', error);
      throw new HttpException(
        `Failed to delete file in S3`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
