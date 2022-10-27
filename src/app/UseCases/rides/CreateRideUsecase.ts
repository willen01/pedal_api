import { IRide } from "../../protocols/Ride";
import { Ride } from "../../entities/Ride";
import { DecodeToken } from "../../protocols/DecodeToken";

export class CreateRideUsecase {
  constructor(private rideRepository: IRide) {}
  async create(data: Ride, bearer_token: string): Promise<void> {
    const token = new DecodeToken(bearer_token);
    const idUser = token.getId();

    await this.rideRepository.create(data, idUser);
  }
}
