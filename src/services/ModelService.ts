import axios from "axios";
import { AddModelModel } from "../models/requests/AddModelModel";
import { GetAllModelModel } from "../models/response/ModelModel";

const API_URL="http://localhost:8080/api/models"; 

class ModelService {

    add(request : AddModelModel) {
        return axios.post(`${API_URL}/add`, request)
        .then(response => {
            console.log(response + ": The model has been successfully added to the database.");
        })
        .catch(error => {
            console.log(error + ": Something went wrong.");
        })
    }
    
    getAllModels():Promise<GetAllModelModel[]> {
        return axios.get(`${API_URL}/getAll`).then(response => response.data);
    }
}

export default new ModelService();