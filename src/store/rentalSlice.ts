import { RentalModel } from './../models/response/RentalModel';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from './configureStore';
import { CarModel } from '../models/response/CarModel';
import { RentalServices } from '../utils/rentalExtraServices';


export interface RentalState{
    rental: RentalModel ;
    insurance : RentalServices;
    extraServices : RentalServices[];
}

//Current date have been serialized to string format to comply with JSON standards.
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
    insurance : JSON.parse(localStorage.getItem("insurance") || "[]" ) || 
    {
        id:0, 
        header: '', 
        description: '', 
        price: 0
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
            // localStorage.setItem("startDate", JSON.stringify(action.payload));
            localStorage.setItem("rental", JSON.stringify(state.rental));

        },
        handleRentalEndDate(state: RentalState, action: PayloadAction<string>){
   
            // Update the startDate for the rental item
            state.rental.endDate = action.payload;

            // Update localStorage
            //localStorage.setItem("endDate", JSON.stringify(action.payload));
            localStorage.setItem("rental", JSON.stringify(state.rental));

        },
        handleRentalTotalPrice(state: RentalState, action: PayloadAction<number>) {
            // Update the total price(calculated by selected days and car daily price, not included addition fees or taxes) for the rental item
            state.rental.totalPrice = action.payload;
            // Update localStorage
            // localStorage.setItem("rentalTotalPrice", JSON.stringify(action.payload));
            localStorage.setItem("rental", JSON.stringify(state.rental));

        },
        addCarToRent(state: RentalState, action: PayloadAction<CarModel>) {
            state.rental.car = action.payload;
            localStorage.setItem("rental", JSON.stringify(state.rental));
        },
        addInsuranceToRent(state: RentalState, action: PayloadAction<RentalServices>) {
            state.insurance = action.payload;
            localStorage.setItem("insurance", JSON.stringify(state.insurance));
        },
        addExtraServicesToRent(state : RentalState, action : PayloadAction<RentalServices>) {
            let isExist = state.extraServices.find((service) => service.id == action.payload.id);
            if (!isExist)
                state.extraServices.push({id: action.payload.id, header: action.payload.header, description: action.payload.description, price: action.payload.price});
            localStorage.setItem("extraServices", JSON.stringify(state.extraServices));
        }
    },
});


export const {handleRentalStartDate, handleRentalEndDate, handleRentalTotalPrice, addCarToRent, addInsuranceToRent, addExtraServicesToRent} = rentalSlice.actions;
export const rentalReducer = rentalSlice.reducer;
export const selectRental = (state: RootState) => state.rental;
