export interface AddInvoiceRequestModel {
    invoiceNo: string,
    totalPrice: number,
    discountRate: number,
    taxRate: number,
    rentalId: number,
}