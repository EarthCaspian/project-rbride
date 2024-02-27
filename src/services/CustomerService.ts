import axios from "axios";
import { CustomerModel } from "../models/requests/CustomerModel";

const API_URL="http://localhost:8080/api/customers"; 

class CustomerService {
    add(request: CustomerModel) : Promise<void>{
       return axios.post<CustomerModel>(`${API_URL}/add`, request)
        .then(response => {
            console.log(response + "Customer has been successfully added to the database.");
        })
        .catch(error => {
            console.log(error + ": Invalid parameters or malformed data.");
            throw error;
        })
    }
}

export default new CustomerService();