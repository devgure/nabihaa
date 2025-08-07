// backend/src/location/location.service.ts
import { PrismaService } from '../prisma/prisma.service';

export class LocationService {
  constructor(private prisma: PrismaService) {}

  async updateUserLocation(userId: string, lat: number, lng: number) {
    return this.prisma.userLocation.upsert({
      where: { userId },
      update: { latitude: lat, longitude: lng },
      create: { userId, latitude: lat, longitude: lng },
    });
  }

  async getNearbyUsers(userId: string, maxDistanceKm: number = 50) {
    const user = await this.prisma.userLocation.findUnique({
      where: { userId },
    });

    if (!user) return [];

    // Use PostGIS if available, or approximate with Haversine
    return this.prisma.$queryRaw`
      SELECT u.*, earth_distance(
        ll_to_earth(${user.latitude}, ${user.longitude}),
        ll_to_earth(l.latitude, l.longitude)
      ) / 1000 AS distance_km
      FROM "User" u
      JOIN "UserLocation" l ON u."locationId" = l.id
      WHERE u.id != ${userId}
      AND earth_distance(
        ll_to_earth(${user.latitude}, ${user.longitude}),
        ll_to_earth(l.latitude, l.longitude)
      ) < ${maxDistanceKm * 1000}
      ORDER BY distance_km
      LIMIT 20
    `;
  }
}