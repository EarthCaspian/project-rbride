import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/configureStore';
import InvoicePDFDocument from '../../InvoicePDFDocument/InvoicePDFDocument';

type Props = {}

const InvoicePDFCard = (props: Props) => {
    const rentalState = useSelector((state: RootState) => state.rental.rental);
    const invoiceState = useSelector((state: RootState) => state.invoice.invoice);
    const rentalExtraState = useSelector((state: RootState) => state.rental);
    const customer = useSelector((state: RootState) => state.customer.customer);
  return (
    <div>
        <InvoicePDFDocument
            customer={customer}
            invoice={invoiceState}
            rental={rentalState}
            rentalExtras={rentalExtraState}
        />
    </div>
  )
}

export default InvoicePDFCard;