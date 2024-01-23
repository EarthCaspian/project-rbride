import { RentalModel } from './../models/response/RentalModel';
import { PayloadAction, createSlice } from "@reduxjs/toolkit";


export interface RentalState{
   rental: RentalModel ;
}


export const rentalSlice = createSlice({
    name: 'rentalSlice',
    initialState: {
        rental: {
            startDate: new Date(),
            endDate: new Date(),
            returnDate: null,
            startKilometer: 0,
            totalPrice: 0,
            carPlate: '',
            userEmail: '',
          },
    },

    reducers: {
        handleRentalStartDate(state: RentalState, action: PayloadAction<Date>){

            // Update the startDate for the rental item
            state.rental.startDate = action.payload;

            // Update localStorage
            localStorage.setItem("startDate", JSON.stringify(action.payload));

        },
        handleRentalEndDate(state: RentalState, action: PayloadAction<Date>){
   
            // Update the startDate for the rental item
            state.rental.endDate = action.payload;

            // Update localStorage
            localStorage.setItem("endDate", JSON.stringify(action.payload));
        },
        handleRentalTotalPrice(state: RentalState, action: PayloadAction<number>) {
            // Update the total price(calculated by selected days and car daily price, not included addition fees or taxes) for the rental item
            state.rental.totalPrice = action.payload;

            // Update localStorage
            localStorage.setItem("rentalTotalPrice", JSON.stringify(action.payload));

        },
    },
});


export const {handleRentalStartDate, handleRentalEndDate, handleRentalTotalPrice} = rentalSlice.actions;
export const rentalReducer = rentalSlice.reducer;
