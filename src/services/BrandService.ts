
import axios, { AxiosResponse } from "axios";
import { AddBrandModel } from "../models/requests/AddBrandModel";
import { BrandModel } from "../models/response/BrandModel";
import { SuccessResponse } from "../models/response/SuccessResponse";
import { UpdateBrandFormValues } from "../components/AdminPanelCards/BrandAdmin/UpdateBrandForm";

const API_URL="http://localhost:8080/api/brands"; 

class BrandService {


    getAll(): Promise<AxiosResponse<BrandModel[]>>{
        return axios.get<BrandModel[]>(`${API_URL}/getAll`);
    }
    add(request : AddBrandModel) {
        return axios.post(`${API_URL}/add`, request)
        .then(response => {
            console.log(response + ": The brand has been successfully added to the database.");
            return response;
        })
        .catch(error => {
            console.log(error + ": Something went wrong.");
            return { data: { success: false, message: "Something went wrong." } };
        })
    }


    update(brand: UpdateBrandFormValues) {
        return axios.put<SuccessResponse>(`${API_URL}/update`, brand)
        .then(response => {
            console.log(response + ": The brand has been successfully updated in the database.");
            return response;
        })
        .catch(error => {
            console.log(error + ": Something went wrong.");
            return { data: { success: false, message: "Something went wrong." } };
        })
    }

    getAllBrands():Promise<BrandModel[]> {
        return axios.get(`${API_URL}/getAll`).then(response => response.data);
    }

    delete(id: number) {
        return axios.delete<SuccessResponse>(`${API_URL}/delete`, { data: { id } });
    }

    getById(id: number) {
        return axios.get<BrandModel>(`${API_URL}/getById/${id}`);
    }
}

export default new BrandService();