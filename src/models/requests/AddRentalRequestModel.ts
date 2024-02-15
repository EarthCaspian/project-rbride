export interface AddRentalRequestModel {
	startDate : Date| null;
	endDate : Date| null;
	carId: number;
	userId: number;
}