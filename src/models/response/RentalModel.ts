import { CarModel } from "./CarModel";

export interface RentalModel {
    //id:number;
	startDate: string;
	endDate: string;
	returnDate?: any;
	startKilometer: number;
	totalPrice: number;
	car: CarModel;
	userEmail: string;
}
