import { ModelModel } from "./../models/response/ModelModel";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "./configureStore";
import { CarModel } from "../models/response/CarModel";
import { BrandModel } from "../models/response/BrandModel";
import { ColorModel } from "../models/response/ColorModel";
import { RentalResponseModel } from "../models/response/RentalResponseModel";
import { RentalStateModel } from "../models/response/RentalStateModel";

export interface RentalState {
  rental: RentalStateModel;
  insurance: RentalExtrasModel;
  extraServices: RentalExtrasModel[];
}

export interface RentalExtrasModel {
  id: number;
  header: string;
  description: string;
  price: number;
}

const initialBrandState: BrandModel = {
  id: 0,
  name: "",
  logoPath: "",
};

const initialModelState: ModelModel = {
  name: "",
  brand: initialBrandState,
};

const initialColorState: ColorModel = {
  id: 0,
  name: "",
  code: "",
};

const initialCarState: CarModel = {
  id: 0,
  modelYear: 2020,
  plate: "",
  minFindeksRate: 0,
  kilometer: 0,
  dailyPrice: 0,
  imagePath: "",
  model: initialModelState,
  color: initialColorState,
};

const currentDate: Date = new Date();

const initialRentalState: RentalResponseModel = {
  id: 0,
  startDate: currentDate,
  endDate: currentDate,
  returnDate: null,
  startKilometer: 0,
  totalPrice: 0,
  car: initialCarState,
  userId: 1,
};

const initialInsuranceState: RentalExtrasModel = {
  id: 0,
  header: "",
  description: "",
  price: 0,
};

const initialRentalSliceState: RentalState = {
  rental:
    JSON.parse(localStorage.getItem("rental") || "{}") || initialRentalState,

  insurance:
    JSON.parse(localStorage.getItem("insurance") || "{}") ||
    initialInsuranceState,

  extraServices:
    JSON.parse(localStorage.getItem("extraServices") || "[]") || "[]",
};

export const rentalSlice = createSlice({
  name: "rental",
  initialState: initialRentalSliceState,

  reducers: {
    handleRentalStartDate(state: RentalState, action: PayloadAction<string>) {
      state.rental.startDate = action.payload;
      localStorage.setItem("rental", JSON.stringify(state.rental));
    },
    handleRentalEndDate(state: RentalState, action: PayloadAction<string>) {
      state.rental.endDate = action.payload;
      localStorage.setItem("rental", JSON.stringify(state.rental));
    },

    handleRentalTotalPrice(state: RentalState, action: PayloadAction<number>) {
      // Update the total price(calculated by selected days and car daily price, not included addition fees or taxes) for the rental item
      state.rental.totalPrice = action.payload;
      // Update localStorage
      localStorage.setItem("rental", JSON.stringify(state.rental));
    },
    addRentalSelectedCar(state: RentalState, action: PayloadAction<CarModel>) {
      // Update the car for the rental item
      state.rental.car = action.payload;
      // Update LocalStorage
      localStorage.setItem("rental", JSON.stringify(state.rental));
    },
    addRentalSelectedInsurance(
      state: RentalState,
      action: PayloadAction<RentalExtrasModel>
    ) {
      // Update the insurance for the rental item
      state.insurance = action.payload;
      localStorage.setItem("insurance", JSON.stringify(state.insurance));
    },
    addRentalSelectedExtraServices(
      state: RentalState,
      action: PayloadAction<RentalExtrasModel[]>
    ) {
      // Update the extra services for the rental item
      state.extraServices = action.payload;
      localStorage.setItem(
        "extraServices",
        JSON.stringify(state.extraServices)
      );
    },
  },
});

export const {
  handleRentalStartDate,
  handleRentalEndDate,
  handleRentalTotalPrice,
  addRentalSelectedCar,
  addRentalSelectedInsurance,
  addRentalSelectedExtraServices,
} = rentalSlice.actions;

export const rentalReducer = rentalSlice.reducer;
export const selectRental = (state: RootState) => state.rental;
