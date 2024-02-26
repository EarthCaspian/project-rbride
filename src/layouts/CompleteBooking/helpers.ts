import { CustomerState } from './../../store/customerSlice';
import { CustomerModel } from '../../models/requests/CustomerModel';
import { AddRentalRequestModel } from '../../models/requests/AddRentalRequestModel';
import { RentalStateModel } from '../../models/response/RentalStateModel';
import { InvoiceModel } from '../../models/response/Invoice.Model';
import { UserState } from '../../store/userSlice';

const customerInfos = (customerState : CustomerState, userState : UserState) : CustomerModel  => {
    return (
        {
            firstName: customerState.customer.firstName,
            lastName: customerState.customer.lastName,
            birthdate:new Date(customerState.customer.birthdate),
            internationalId: customerState.customer.internationalId,
            licenceIssueDate: new Date(customerState.customer.licenceIssueDate),
            userId: userState.userId,
        }
    );
};

const rentalInfos = (rentalState : RentalStateModel, userState : UserState) : AddRentalRequestModel  => {
    return (
        {
            startDate: new Date(rentalState.startDate),
            endDate: new Date(rentalState.endDate),
            carId: rentalState.car.id,
            userId: userState.userId,
        }
    );
};

const invoiceInfos = (invoiceState : InvoiceModel, rentalId : number) : InvoiceModel  => {
    return (
        {
            invoiceNo: invoiceState.invoiceNo,
            totalPrice: invoiceState.totalPrice,
            discountRate: invoiceState.discountRate,
            taxRate: invoiceState.taxRate,
            rentalId: rentalId,
        }
    );
};


export {rentalInfos, customerInfos, invoiceInfos};