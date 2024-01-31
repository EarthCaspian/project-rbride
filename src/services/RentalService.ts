import axios from "axios";
import { AddRentalRequestModel } from "../models/response/RentalModel";

const API_URL="http://localhost:8080/rentals";

class RentalService {
    //Function to send a request to the backend for adding a rental entry to the database.
    add(request : AddRentalRequestModel) {
        axios.post(`${API_URL}/add`, request)
        .then(response => {
            console.log(response + ": The rental has been successfully added to the database.");
        })
        .catch(error => {
            console.log(error + ": Invalid parameters or malformed data.");
        })
    }
}

export default new RentalService();
