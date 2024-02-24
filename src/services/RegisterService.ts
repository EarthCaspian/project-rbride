import axios from 'axios';
import { RegisterModel } from '../models/requests/RegisterModel';

const API_URL = "http://localhost:8080/api/auth";

class RegisterService {
    register(request: RegisterModel) {
        return axios.post(`${API_URL}/register`, request).then(response => {
            console.log(response + ": The brand has been successfully added to the database.");
            return response;
        })
        .catch(error => {
            console.log(error + ": Something went wrong.");
            return { data: { success: false, message: "Something went wrong." } };
        })
    }
}

export default new RegisterService();