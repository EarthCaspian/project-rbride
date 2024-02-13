
import axios, { AxiosResponse } from "axios";

import { AddBrandModel } from "../models/requests/AddBrandModel";

import { BrandModel } from "../models/response/BrandModel";

const API_URL="http://localhost:8080/api/brands"; 

class BrandService {


    getAll(): Promise<AxiosResponse<BrandModel[]>>{
        return axios.get<BrandModel[]>(`${API_URL}/getAll`);
    }
    add(request : AddBrandModel) {
        return axios.post(`${API_URL}/add`, request)
        .then(response => {
            console.log(response + ": The brand has been successfully added to the database.");
        })
        .catch(error => {
            console.log(error + ": Something went wrong.");
        })
    }

}

export default new BrandService();