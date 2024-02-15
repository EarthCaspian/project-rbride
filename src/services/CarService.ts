import axios, { AxiosResponse } from "axios";
import { CarModel } from "../models/response/CarModel";
import { AddCarModel } from "../models/requests/AddCarModel";
import { SuccessResponse } from "../models/response/SuccessResponse";

const API_URL="http://localhost:8080/api/cars"; 



class CarService {

    getAll(): Promise<AxiosResponse<CarModel[]>>{
        return axios.get<CarModel[]>(`${API_URL}/getAll`);
    }

    getById(id: number) {
        return axios.get<CarModel>(`${API_URL}/getById/${id}`);
    }

    delete(id: number) {
        return axios.delete<SuccessResponse>(`${API_URL}/delete`, { data: { id } });
    }

    add(request : AddCarModel) {
        return axios.post<SuccessResponse>(`${API_URL}/add`, request)
        .then(response => {
            console.log(response + ": The car has been successfully added to the database.");
            return response;
        })
        .catch(error => {
            console.log(error + ": Something went wrong.");
            return { data: { success: false, message: "Something went wrong." } };
        })
    }
}

export default new CarService();