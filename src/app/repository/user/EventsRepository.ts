import { PrismaClient } from "@prisma/client";
import { Ride } from "src/app/entities/Ride";
import { IEvents } from "src/app/protocols/User";

const prismaClient = new PrismaClient();

export class EventsRepository implements IEvents {
  async listRides(id: string): Promise<Ride[]> {
    return await prismaClient.rides.findMany({ where: { user_id: id } });
  }

  async listParticipations(id: string): Promise<Ride[]> {
    const foo = await prismaClient.userEvents.findMany({
      where: {
        user_id: id,
      },
      include: {
        events: true,
      },
    });
    const participations = foo.map((p) => p.events);
    return participations;
  }
}
