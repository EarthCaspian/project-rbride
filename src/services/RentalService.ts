import axios, { AxiosResponse } from "axios";
import { AddRentalRequestModel } from "./../models/requests/AddRentalRequestModel";
import { RentalResponseModel } from "../models/response/RentalResponseModel";
import { GetRentalIdModel } from "../models/response/GetRentalIdModel";
import { RentalIdRequestModel } from "../models/requests/RentalIdRequestModel";

const API_URL = "http://localhost:8080/api/rentals";

interface AddRentalResponseModel {
  id : number,
  result : {success : boolean, message : string},
};

class RentalService {
    //Function to send a request to the backend for adding a rental entry to the database.
    add(request : AddRentalRequestModel): Promise<number> {
        return axios.post(`${API_URL}/add`, request)
        .then((response : AxiosResponse<AddRentalResponseModel> ) => {
            console.log(response.data.result.message + ": The rental has been successfully added to the database.");
            return response.data.id;
        })
        .catch(error => {
            console.log(error + ": Invalid parameters or malformed data.");
            return 0;
        })
    }

    getAll() : Promise<AxiosResponse<RentalResponseModel[]>> {
        return axios.get<RentalResponseModel[]>(`${API_URL}/getAll`);
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