import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { CustomerModel } from "../models/requests/CustomerModel";
import { RootState } from "./configureStore";

export interface CustomerState {
  customer: CustomerModel;
}

const initialCustomerSliceState: CustomerState = {
  customer: {
    firstName: "",
    lastName: "",
    birthdate: "",
    internationalId: "",
    licenceIssueDate: "",
    userId: 1,
  },
};

export const customerSlice = createSlice({
  name: "customer",
  initialState: initialCustomerSliceState,

  reducers: {
    handleCustomerFirstName(
      state: CustomerState,
      action: PayloadAction<string>
    ) {
      state.customer.firstName = action.payload;
      localStorage.setItem("customer", JSON.stringify(state.customer));
    },
    handleCustomerLastName(
      state: CustomerState,
      action: PayloadAction<string>
    ) {
      state.customer.lastName = action.payload;
      localStorage.setItem("customer", JSON.stringify(state.customer));
    },
    handleCustomerInternationalId(
      state: CustomerState,
      action: PayloadAction<string>
    ) {
      state.customer.internationalId = action.payload;
      localStorage.setItem("customer", JSON.stringify(state.customer));
    },
    handleCustomerBirthdate(
      state: CustomerState,
      action: PayloadAction<string>
    ) {
      state.customer.birthdate = action.payload;
      localStorage.setItem("customer", JSON.stringify(state.customer));
    },
    handleCustomerLicenceIssueDate(
      state: CustomerState,
      action: PayloadAction<string>
    ) {
      state.customer.licenceIssueDate = action.payload;
      localStorage.setItem("customer", JSON.stringify(state.customer));
    },
  },
});

export const customerReducer = customerSlice.reducer;
export const customerState = (state: RootState) => state.customer;
export const {
  handleCustomerBirthdate,
  handleCustomerFirstName,
  handleCustomerInternationalId,
  handleCustomerLastName,
  handleCustomerLicenceIssueDate,
} = customerSlice.actions;
