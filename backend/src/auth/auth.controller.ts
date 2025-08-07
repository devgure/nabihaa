// auth/auth.controller.ts
@Post('verify-firebase')
async verifyFirebase(@Body() body: { idToken: string }) {
  const decodedToken = await admin.auth().verifyIdToken(body.idToken);
  const user = await this.userService.findByEmail(decodedToken.email);
  const token = this.jwtService.sign({ userId: user.id });
  return { token };
}