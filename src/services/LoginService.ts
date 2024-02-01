import axios from 'axios';
import { LoginModel } from '../models/requests/LoginModel';

const API_URL = "http://localhost:8080/auth";

class LoginService {
    login(request : LoginModel) {
        return axios.post(`${API_URL}/login`, request)
    };
}

export default new LoginService();