import axios, { AxiosResponse } from "axios";
import { CarModel, DeleteResponse } from "../models/response/CarModel";
import { AddCarModel } from "../models/requests/AddCarModel";

const API_URL="http://localhost:8080/api/cars"; 



class CarService {

    getAll(): Promise<AxiosResponse<CarModel[]>>{
        return axios.get<CarModel[]>(`${API_URL}/getAll`);
    }

    getById(id: number) {
        return axios.get<CarModel>(`${API_URL}/getById/${id}`);
    }

    delete(id: number) {
        return axios.delete<DeleteResponse>(`${API_URL}/delete`, { data: { id } });
    }

    add(request : AddCarModel) {
        return axios.post(`${API_URL}/add`, request)
        .then(response => {
            console.log(response + ": The car has been successfully added to the database.");
        })
        .catch(error => {
            console.log(error + ": Something went wrong.");
        })
    }
}

export default new CarService();