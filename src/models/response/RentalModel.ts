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

export interface AddRentalRequestModel {
	startDate : any;
	endDate : any;
	carId: number;
	userId: number;
}

export interface GetRentalByUserIdRequest {
    car: CarModel;
    startDate: any;
    returnDate: any;
    totalPrice: number;
	userId: number;
}