
import axios, { AxiosResponse } from "axios";
import { ModelModel } from "../models/response/ModelModel";


import { AddModelModel } from "../models/requests/AddModelModel";
import { GetAllModelModel } from "../models/response/ModelModel";
import { SuccessResponse } from "../models/response/SuccessResponse";
import { UpdateModelFormValues } from "../components/AdminPanelCards/ModelAdmin/UpdateModelForm";


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

    update(model: UpdateModelFormValues) {
        return axios.put<SuccessResponse>(`${API_URL}/update`, model)
        .then(response => {
            console.log(response + ": The model has been successfully updated in the database.");
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

    getById(id: number) {
        return axios.get<ModelModel>(`${API_URL}/getById/${id}`);
    }
  
}

export default new ModelService();