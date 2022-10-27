import { PrismaClient } from "@prisma/client";
import { Subscribe } from "../../entities/Subscribe";
import { Ride } from "../../entities/Ride";
import { IRide } from "../../protocols/Ride";

const prismaClient = new PrismaClient();

export class RideRepository implements IRide {
  async create(ride: Ride, idUser: string): Promise<void> {
    await prismaClient.rides.create({
      data: {
        ...ride,
        user_id: idUser,
        start_date: new Date(ride.start_date),
        start_date_registration: new Date(ride.start_date_registration),
        end_date_registration: new Date(ride.end_date_registration),
      },
    });
  }

  async subscribe(data: Subscribe): Promise<void> {
    await prismaClient.userEvents.create({
      data: {
        ...data,
        subscription_Date: new Date(data.subscription_Date),
      },
    });
  }
}
