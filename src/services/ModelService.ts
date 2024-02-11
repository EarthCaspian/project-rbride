import axios from "axios";
import { AddModelModel } from "../models/requests/AddModelModel";

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
}

export default new ModelService();