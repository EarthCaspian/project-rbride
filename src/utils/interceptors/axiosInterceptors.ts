import axios from "axios"
import TokenService from "../../services/TokenService"
import {
	decreaseRequestCount,
	increaseRequestCount,
} from "../../store/loadingSlice";
import {store} from "../../store/configureStore";



const axiosInstance = axios.create({
    baseURL:"http://localhost:8080/api/"
})

axiosInstance.interceptors.request.use(config => {
    let token = TokenService.getToken();
    console.log('Token:', token);
    if (token) config.headers.Authorization = `Bearer ${token}`;
    console.log('Headers:', config.headers); 

    store.dispatch(increaseRequestCount());
    
    return config;
})

axiosInstance.interceptors.response.use(
    response => {
        store.dispatch(decreaseRequestCount());
        return response;
    },
    error => {
        store.dispatch(decreaseRequestCount());
        console.log(error);
    }
)

export default axiosInstance;
