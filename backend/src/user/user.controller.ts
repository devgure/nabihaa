// backend/src/user/user.controller.ts
@Post('photos/upload')
@UseGuards(JwtAuthGuard)
async getPresignedUrl(
  @Body() body: { fileName: string; fileType: string },
) {
  const { url, key } = await this.s3Service.getPresignedUrl(body.fileName, body.fileType);
  return { url, key }; // Frontend uploads directly to S3
}