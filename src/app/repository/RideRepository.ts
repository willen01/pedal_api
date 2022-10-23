import { PrismaClient, Rides } from "@prisma/client";
import { Ride } from "../entities/Ride";
import { Subscribe } from "../entities/Subscribe";

const prismaClient = new PrismaClient();

class RideRepository {
  async save(ride: Ride, idUser: string) {
    return await prismaClient.rides.create({
      data: {
        ...ride,
        user_id: idUser,
        start_date: new Date(ride.start_date),
        start_date_registration: new Date(ride.start_date_registration),
        end_date_registration: new Date(ride.end_date_registration),
      },
    });
  } //salva novo evento no banco

  async find(id: string) {
    return await prismaClient.rides.findFirst({ where: { id } });
  }

  async read() {
    return await prismaClient.rides.findMany();
  } // lista todos os eventos cadastrados

  async saveSubscribeRide(subscribe: Subscribe) {
    return await prismaClient.userEvents.create({
      data: {
        ...subscribe,
        subscription_Date: new Date(subscribe.subscription_Date),
      },
    });
  } //salva no banco a inscrição do usuário no evento
}

export default new RideRepository();
