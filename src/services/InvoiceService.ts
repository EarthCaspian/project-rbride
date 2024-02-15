import axios from "axios";
import { InvoiceModel } from "../models/response/Invoice.Model";

const API_URL="http://localhost:8080/api/invoices"; 

class InvoiceService {
    add(request: InvoiceModel) {
        axios.post<InvoiceModel>(`${API_URL}/add`, request)
        .then(response => {
            console.log(response + "Invoice has been successfully added to the database.");
        })
        .catch(error => {
            console.log(error + ": Invalid parameters or malformed data.");
        })
    }
}

export default new InvoiceService();