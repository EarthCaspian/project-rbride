import axios, { AxiosResponse } from "axios";
import { BrandModel } from "../models/response/BrandModel";

const API_URL="http://localhost:8080/api/brands"; 

class BrandService {

    getAll(): Promise<AxiosResponse<BrandModel[]>>{
        return axios.get<BrandModel[]>(`${API_URL}/getAll`);
    }
}

export default new BrandService();