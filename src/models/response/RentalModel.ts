export interface RentalModel {
    //id:number;
	startDate: Date;
	endDate: Date;
	returnDate?: any;
	startKilometer: number;
	totalPrice: number;
	carPlate: string;
	userEmail: string;
}
