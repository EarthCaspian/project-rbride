
import { LoginModel } from '../models/requests/LoginModel';
import axiosInstance from '../utils/interceptors/axiosInterceptors';


class LoginService {
    login(request : LoginModel) {
        return axiosInstance.post("auth/login", request)
    };
}

export default new LoginService();