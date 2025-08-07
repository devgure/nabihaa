// backend/src/location/location.controller.ts
@Post('location')
@UseGuards(JwtAuthGuard)
async updateLocation(
  @Request() req,
  @Body() body: { lat: number; lng: number },
) {
  await this.locationService.updateUserLocation(req.user.userId, body.lat, body.lng);
  return { success: true };
}