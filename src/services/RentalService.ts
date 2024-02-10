import axios from "axios";
import { AddRentalRequestModel, GetRentalByUserIdRequest } from "../models/response/RentalModel";
import axiosInstance from "../utils/interceptors/axiosInterceptors";

const API_URL="http://localhost:8080/api/rentals";

class RentalService {
    //Function to send a request to the backend for adding a rental entry to the database.
    add(request : AddRentalRequestModel) {
        axios.post(`${API_URL}/add`, request)
        .then(response => {
            console.log(response + ": The rental has been successfully added to the database.");
        })
        .catch(error => {
            console.log(error + ": Invalid parameters or malformed data.");
        })
    }

    getRentals(token: string): Promise<GetRentalByUserIdRequest[]> {
        return axiosInstance.get<GetRentalByUserIdRequest[]>(`/rentals/getRentalsByUserId`, {
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

export default new RentalService();
