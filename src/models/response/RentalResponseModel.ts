import { CarModel } from "../response/CarModel";

export interface RentalResponseModel {
  id: number;
  startDate: Date;
  endDate: Date;
  returnDate?: Date | null;
  startKilometer: number;
  totalPrice: number;
  car: CarModel;
  userId: number;
}
