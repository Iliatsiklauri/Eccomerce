import {
  ChecksumAlgorithm,
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";

export class awsService {
  private bucketName = process.env.AWS_BUCKET_NAME;
  private storageService = new S3Client({
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
    region: process.env.AWS_REGION,
  });

  async uploadImage(file: Express.Multer.File, folder: string) {
    try {
      const type = file.mimetype.split("/")[1];
      const filePath = `${folder}/${new Date().getTime()}.${type}`;
      const imageUrl = `https://d31o8esktuui0e.cloudfront.net/${filePath}`;

      const config = {
        Key: filePath,
        Bucket: this.bucketName,
        Body: file.buffer,
      };
      const command = new PutObjectCommand(config);
      await this.storageService.send(command);
      return { filePath, imageUrl };
    } catch (er) {
      return null;
    }
  }

  async deleteImage(filepath: string) {
    try {
      const config = {
        Key: filepath,
        Bucket: this.bucketName,
      };
      const command = new DeleteObjectCommand(config);
      return this.storageService.send(command);
    } catch (er) {
      return null;
    }
  }
}