import { RentalModel } from './../models/response/RentalModel';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from './configureStore';
import { CarModel } from '../models/response/CarModel';

export interface RentalState{
    rental: RentalModel ;
    insurance : RentalExtrasModel;
    extraServices : RentalExtrasModel[];
}

export interface RentalExtrasModel {
    id: number;
    header: string;
    description: string;
    price: number;
}

//Current date has been serialized to string format to comply with JSON standards.
const currentDate : Date = new Date();
const currentDateString : string = currentDate.toLocaleDateString();

const initialRentalState : RentalState = {
    rental : JSON.parse(localStorage.getItem("rental") || "[]" ) ||
    {
        startDate: currentDateString,
        endDate: currentDateString,
        returnDate: null,
        startKilometer: 0,
        totalPrice: 0,
        car: {},
        userEmail: '',
    },
    insurance : JSON.parse(localStorage.getItem("insurance") || "{}" ) || 
    {
        id:0,
        header: '', 
        description: '', 
        price: 0,
    },
    extraServices : JSON.parse(localStorage.getItem("extraServices") || "[]" )
}

export const rentalSlice = createSlice({
    name: 'rental',
    initialState: initialRentalState,

    reducers: {
        handleRentalStartDate(state: RentalState, action: PayloadAction<string>){

            // Update the startDate for the rental item
            state.rental.startDate = action.payload;
            // Update localStorage
            localStorage.setItem("rental", JSON.stringify(state.rental));

        },
        handleRentalEndDate(state: RentalState, action: PayloadAction<string>){
   
            // Update the startDate for the rental item
            state.rental.endDate = action.payload;
            // Update localStorage
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
        addRentalSelectedInsurance(state: RentalState, action: PayloadAction<RentalExtrasModel>) {
            // Update the insurance for the rental item
            state.insurance = action.payload;
            localStorage.setItem("insurance", JSON.stringify(state.insurance));
        },
        addRentalSelectedExtraServices(state : RentalState, action : PayloadAction<RentalExtrasModel[]>) {
            // Update the extra services for the rental item
            state.extraServices = action.payload;
            localStorage.setItem("extraServices", JSON.stringify(state.extraServices));
        }
    },
});

export const {
    handleRentalStartDate, 
    handleRentalEndDate, 
    handleRentalTotalPrice, 
    addRentalSelectedCar, 
    addRentalSelectedInsurance, 
    addRentalSelectedExtraServices
} = rentalSlice.actions;

export const rentalReducer = rentalSlice.reducer;
export const selectRental = (state: RootState) => state.rental;
