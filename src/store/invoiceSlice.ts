import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { InvoiceModel } from "../models/response/Invoice.Model";
import { RentalResponseModel } from "../models/response/RentalResponseModel";
import { RootState } from "./configureStore";
import { GetRentalIdModel } from "../models/response/GetRentalIdModel";

export interface InvoiceState {
  invoice: InvoiceModel;
}

const initialInvoiceSliceState: InvoiceState = {
  invoice: {
    invoiceNo: "",
    totalPrice: 0,
    discountRate: 0,
    taxRate: 0,
    rentalId: 0,
  },
};

export const invoiceSlice = createSlice({
  name: "invoice",
  initialState: initialInvoiceSliceState,

  reducers: {
    handleRentalForInvoice(
      state: InvoiceState,
      action: PayloadAction<RentalResponseModel>
    ) {
      state.invoice.rentalId = action.payload.id;
    },
    handleInvoiceNoForInvoice(
      state: InvoiceState,
      action: PayloadAction<string>
    ) {
      state.invoice.invoiceNo = action.payload;
      localStorage.setItem("invoice", JSON.stringify(state.invoice));
    },
    handleTotalPriceForInvoice(
      state: InvoiceState,
      action: PayloadAction<number>
    ) {
      state.invoice.totalPrice = action.payload;
      localStorage.setItem("invoice", JSON.stringify(state.invoice));
    },
    handleDiscountRateForInvoice(
      state: InvoiceState,
      action: PayloadAction<number>
    ) {
      state.invoice.discountRate = action.payload;
      localStorage.setItem("invoice", JSON.stringify(state.invoice));
    },
    handleTaxRateForInvoice(
      state: InvoiceState,
      action: PayloadAction<number>
    ) {
      state.invoice.taxRate = action.payload;
      localStorage.setItem("invoice", JSON.stringify(state.invoice));
    },
    handleRentalIdForInvoice(
      state: InvoiceState,
      action: PayloadAction<[GetRentalIdModel]>
    ) {
      action.payload.map((response) => (state.invoice.rentalId = response.id));
      localStorage.setItem("invoice", JSON.stringify(state.invoice));
    },
  },
});

export const invoiceReducer = invoiceSlice.reducer;
export const invoiceState = (state: RootState) => state.invoice;
export const {
  handleRentalForInvoice,
  handleRentalIdForInvoice,
  handleDiscountRateForInvoice,
  handleInvoiceNoForInvoice,
  handleTaxRateForInvoice,
  handleTotalPriceForInvoice,
} = invoiceSlice.actions;
