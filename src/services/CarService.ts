import axios, { AxiosResponse } from "axios";
import { CarModel } from "../models/response/CarModel";

const API_URL="http://localhost:8080/cars"; 

class CarService {

    getAll(): Promise<AxiosResponse<CarModel[]>>{
        return axios.get<CarModel[]>(`${API_URL}/getall`);
    }

    getById(id: number) {
        return axios.get<CarModel>(`${API_URL}/getById/${id}`);
    }

    delete(id: number) {
        return axios.delete<CarModel>(`${API_URL}/${id}`);
    }
}

export default new CarService();