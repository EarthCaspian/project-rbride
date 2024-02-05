import axios from 'axios';
import { RegisterModel } from '../models/requests/RegisterModel';

const API_URL = "http://localhost:8080/api/auth";

class RegisterService {
    register(request: RegisterModel) {
        return axios.post(`${API_URL}/register`, request)
    }
}

export default new RegisterService();