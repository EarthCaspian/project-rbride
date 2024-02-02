import axios from "axios"
import TokenService from "../../services/TokenService"
import {
	decreaseRequestCount,
	increaseRequestCount,
} from "../../store/loadingSlice";
import { useDispatch } from "react-redux";

const dispatch = useDispatch();

const axiosInstance = axios.create({
    baseURL:"http://localhost:8080/api/"
})

axiosInstance.interceptors.request.use(config => {
    let token = TokenService.getToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;


    dispatch(increaseRequestCount());
    
    return config;
})

axiosInstance.interceptors.response.use(
    response => {
        dispatch(decreaseRequestCount());
        return response;
    },
    error => {
        dispatch(decreaseRequestCount());
        console.log(error);
    }
)

export default axiosInstance;
