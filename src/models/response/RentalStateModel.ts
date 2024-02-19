import { CarModel } from "./CarModel";

export interface RentalStateModel {
    id:number;
	startDate: string; 		//	Defined string to use as a serializable value
	endDate: string;	   //	Defined string to use as a serializable value
	returnDate?: Date | null;
	startKilometer: number;
	totalPrice: number;
	car: CarModel;
}