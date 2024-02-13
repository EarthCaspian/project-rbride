import axios, { AxiosResponse } from "axios";
import { ColorModel } from "../models/response/ColorModel";

const API_URL="http://localhost:8080/api/colors"; 

class ColorService {

    getAll(): Promise<AxiosResponse<ColorModel[]>>{
        return axios.get<ColorModel[]>(`${API_URL}/getAll`);
    }
}

export default new ColorService();