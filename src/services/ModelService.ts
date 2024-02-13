import axios, { AxiosResponse } from "axios";
import { ModelModel } from "../models/response/ModelModel";

const API_URL="http://localhost:8080/api/models"; 

class ModelService {

    getAll(): Promise<AxiosResponse<ModelModel[]>>{
        return axios.get<ModelModel[]>(`${API_URL}/getAll`);
    }
}

export default new ModelService();