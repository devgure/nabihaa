// backend/src/ai/ai.controller.ts
@Post('verify-photo')
@UseGuards(JwtAuthGuard)
async verifyPhoto(@Body() body: { photoKey: string }) {
  const isValid = await this.aiService.verifyFace(body.photoKey);
  if (isValid) {
    await this.userPhotoService.markVerified(body.photoKey);
  }
  return { verified: isValid };
}