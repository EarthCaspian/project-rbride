import { GetRentalByUserIdResponse } from "../models/response/GetRentalByUserIdResponse";
import axiosInstance from "../utils/interceptors/axiosInterceptors";


class RentalGetRentals {

    getRentals(token: string): Promise<GetRentalByUserIdResponse[]> {
        return axiosInstance.get<GetRentalByUserIdResponse[]>(`/rentals/getRentalsByUserId`, {
            headers: {
                Authorization: `${token}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            throw error;
        });
    }

}

export default new RentalGetRentals();