
import axios, { AxiosResponse } from "axios";
import { ModelModel } from "../models/response/ModelModel";


import { AddModelModel } from "../models/requests/AddModelModel";
import { GetAllModelModel } from "../models/response/ModelModel";
import { SuccessResponse } from "../models/response/SuccessResponse";


const API_URL="http://localhost:8080/api/models"; 

class ModelService {


    getAll(): Promise<AxiosResponse<ModelModel[]>>{
        return axios.get<ModelModel[]>(`${API_URL}/getAll`);
    }
    add(request : AddModelModel) {
        return axios.post(`${API_URL}/add`, request)
        .then(response => {
            console.log(response + ": The model has been successfully added to the database.");
            return response;
        })
        .catch(error => {
            console.log(error + ": Something went wrong.");
            return { data: { success: false, message: "Something went wrong." } };
        })
    }
    getAllModels():Promise<GetAllModelModel[]> {
        return axios.get(`${API_URL}/getAll`).then(response => response.data);
    }
   
    delete(id: number) {
        return axios.delete<SuccessResponse>(`${API_URL}/delete`, { data: { id } });
    }
  
}

export default new ModelService();