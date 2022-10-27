import { IRide } from "../../protocols/Ride";
import { Subscribe } from "../../entities/Subscribe";
import { VerifyDate } from "../../protocols/VeriryDate";

const verifyDate = new VerifyDate();

export class SubscribeRideUseCase {
  constructor(private rideRepository: IRide) {}

  async subscribe(subscribeData: Subscribe): Promise<void> {
    const checkLimitDateSubscription = await verifyDate.verify(
      subscribeData.subscription_Date,
      subscribeData.ride_id
    );
    if (checkLimitDateSubscription) throw "event expired"; //lança excessão quando a inscrição excede o prazo limite

    await this.rideRepository.subscribe(subscribeData);
  }
}
