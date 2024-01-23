import { RentalModel } from "./RentalModel";

export interface InvoiceModel {
    invoiceNo: string;
    totalPrice: number;
    discountRate: number;
    taxRate: number;
    rental: RentalModel;
}