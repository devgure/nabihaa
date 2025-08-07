// backend/src/ai/ai.service.ts
import { Rekognition } from '@aws-sdk/client-rekognition';

const rekognition = new Rekognition({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

export class AiService {
  async verifyFace(photoUrl: string): Promise<boolean> {
    const response = await rekognition.detectFaces({
      Image: { S3Object: { Bucket: process.env.S3_BUCKET_NAME, Name: photoUrl } },
      Attributes: ['ALL'],
    });

    const face = response.FaceDetails?.[0];
    if (!face) return false;

    // Check if face is clear, eyes open, not spoof
    return (
      face.Confidence > 90 &&
      face.EyesOpen?.Value === true &&
      face.Smile?.Value === true &&
      !face.FaceOccluded?.Value
    );
  }
}