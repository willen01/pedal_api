export interface Ride {
  name: string;
  start_date: Date;
  start_date_registration: Date;
  end_date_registration: Date;
  additional_information: string;
  start_place: string;
  participants_limit: number;
  user_id: string;
}
