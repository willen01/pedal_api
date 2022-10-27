import { Ride } from "../../entities/Ride";
import { DecodeToken } from "../../protocols/DecodeToken";
import { RideRepository } from "../../repository/ride/ListRideRepository";

export class CreateRideUsecase {
  constructor(private rideRepository: RideRepository) {}
  async create(data: Ride, bearer_token: string): Promise<void> {
    const token = new DecodeToken(bearer_token);
    const idUser = token.getId();

    await this.rideRepository.create(data, idUser);
  }
}