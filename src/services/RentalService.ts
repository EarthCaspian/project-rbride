import axios, { AxiosResponse } from "axios";
import { RentalModel } from "../models/response/RentalModel";
import { AddRentalRequestModel } from "../models/requests/RentalModel";
import { AddRentalRequestModel } from "./../models/requests/AddRentalRequestModel";
import axios from "axios";
import { RentalResponseModel } from "../models/response/RentalResponseModel";
import { GetRentalIdModel } from "../models/response/GetRentalIdModel";
import { RentalIdRequestModel } from "../models/requests/RentalIdRequestModel";

const API_URL = "http://localhost:8080/api/rentals";

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

    getAll() : Promise<AxiosResponse<RentalModel[]>> {
        return axios.get<RentalModel[]>(`${API_URL}/getAll`);
    }
  //Function to send a request to the backend for adding a rental entry to the database.
  add(request: AddRentalRequestModel) {
    axios
      .post<AddRentalRequestModel>(`${API_URL}/add`, request)
      .then((response) => {
        console.log(
          response + ": The rental has been successfully added to the database."
        );
      })
      .catch((error) => {
        console.log(error + ": Invalid parameters or malformed data.");
      });
  }
  getById(id: number) {
    return axios.get<RentalResponseModel>(`${API_URL}/getById/${id}`);
  }

  getRentalId(requestModel: RentalIdRequestModel) {
    return axios.get<GetRentalIdModel>(`${API_URL}/getRentalId`, {
      params: {
        startDate: requestModel.startDate,
        endDate: requestModel.endDate,
        carId: requestModel.carId,
        userId: requestModel.userId,
      },
    });
  }
}

export default new RentalService();