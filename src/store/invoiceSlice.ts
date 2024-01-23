import { createSlice } from "@reduxjs/toolkit";
import { InvoiceModel } from "../models/response/Invoice.Model";

export interface invoiceState {
    invoice: InvoiceModel ;
}

export const invoiceSlice = createSlice({
    name: 'invoiceSlice',
    initialState: {
        invoice: {},
    },

    reducers: {
        
    }
})