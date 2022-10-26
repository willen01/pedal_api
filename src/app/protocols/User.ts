import { Ride } from "../entities/Ride";
import { User } from "../entities/User";

export interface IUser {
  findOne(login: string): Promise<User | null>;
  save(user: User): Promise<void>;
}

export interface IEvents {
  listRides(id: string): Promise<Ride[]>;
  listParticipations(id: string): Promise<Ride[]>;
}
