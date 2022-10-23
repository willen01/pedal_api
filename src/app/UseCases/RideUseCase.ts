import { VerifyDate } from "../protocols/VeriryDate";
import { Ride } from "../entities/Ride";
import { Subscribe } from "../entities/Subscribe";
import RideRepository from "../repository/RideRepository";
import { DecodeToken } from "../protocols/DecodeToken";

const verifyDate = new VerifyDate();

class RideUseCase {
  async create(ride: Ride, bearer_token: string): Promise<void> {
    const token = new DecodeToken(bearer_token);
    const idUser = token.getId(); //pega o id do usuário pelo token jwt

    await RideRepository.save(ride, idUser);
  } //cria um novo evento

  read() {
    return RideRepository.read();
  }

  async subscribe(infoSubscribe: Subscribe): Promise<boolean | void> {
    const checkLimitDateSubscription = await verifyDate.verify(
      infoSubscribe.subscription_Date,
      infoSubscribe.ride_id
    ); //verifica se a inscrição está dentro do prazo limite

    if (checkLimitDateSubscription) throw "event expired"; //lança excessão quando a inscrição excede o prazo limite

    await RideRepository.saveSubscribeRide(infoSubscribe); //chama banco para persistir a inscrição no evento
  }
}

export default new RideUseCase();
