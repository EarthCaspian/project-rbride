import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import InvoicePDFDocument from '../../InvoicePDFDocument/InvoicePDFDocument';
import { RentalState } from '../../../store/rentalSlice';

type Props = {
  rentalState : RentalState,
}

const InvoicePDFCard = (props: Props) => {
    const rentalState = props.rentalState;
    const invoiceState = useSelector((state: RootState) => state.invoice.invoice);
    const customer = useSelector((state: RootState) => state.customer.customer);
  return (
    <div>
        <InvoicePDFDocument
            customer={customer}
            invoice={invoiceState}
            rental={rentalState.rental}
            rentalExtras={rentalState}
        />
    </div>
  )
}

export default InvoicePDFCard;