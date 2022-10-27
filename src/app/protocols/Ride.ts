import { Ride } from "../entities/Ride";
import { Subscribe } from "../entities/Subscribe";

export interface IRide {
  create(data: Ride, idUser: string): Promise<void>;
  subscribe(data: Subscribe): Promise<void>;
}
