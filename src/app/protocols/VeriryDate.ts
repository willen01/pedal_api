import { prisma, PrismaClient } from "@prisma/client";
import RideRepository from "../repository/RideRepository";

const prismaClient = new PrismaClient();

export class VerifyDate {
  async verify(date: Date, ride_id: string): Promise<boolean> {
    const getDate = new Date(date); //converte o valor recebido para o formato de date
    const findRide = await RideRepository.find(ride_id); //recupera o evento pelo id

    if (findRide == null) throw "Ride not exists";

    if (getDate > findRide.end_date_registration) {
      return true;
    } //verifica se a data de inscrição é inferior ao prazo limite.

    return false;
  } // busca o evento pelo id e verifica se a inscrição aconteceu dentro do prazo.
}
