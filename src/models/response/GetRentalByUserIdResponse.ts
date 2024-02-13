export interface GetRentalByUserIdResponse {
	id: number;
    startDate: Date;
    endDate: Date;
    totalPrice: number;
	carPlate: string;
	username: string;
	userId: string;

}