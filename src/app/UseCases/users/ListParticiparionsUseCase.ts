import { IEvents } from "../../protocols/User";
import { Ride } from "../../entities/Ride";
import { DecodeToken } from "../../protocols/DecodeToken";

export class ListParticipationsUseCase {
  constructor(private eventsRepository: IEvents) {}

  async list(bearer_token: string): Promise<Ride[]> {
    const token = new DecodeToken(bearer_token);
    const userId = token.getId(); //pega o id do usuário pelo token inserido

    return await this.eventsRepository.listParticipations(userId);
  }
}
