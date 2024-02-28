import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  PDFViewer,
} from "@react-pdf/renderer";
import { formatDateToStringDate } from "../../utils/formatDate";
import { InvoiceModel } from "../../models/response/Invoice.Model";
import { RentalState } from "../../store/rentalSlice";
import { CustomerStateModel } from "../../store/customerSlice";
import { RentalStateModel } from "../../models/response/RentalStateModel";

type InvoicePdf = {
  invoice: InvoiceModel;
  rental: RentalStateModel;
  rentalExtras: RentalState;
  customer: CustomerStateModel;
};

// Defining styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  table: {
    display: "flex",
    flexDirection: "column",
    width: "auto",
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
    borderCollapse: "collapse",
    marginTop: 10,
  },
  tableRow: {
    flexDirection: "row",
  },
  tableCell: {
    flexGrow: 1,
    padding: 5,
    borderStyle: "solid",
    borderColor: "#bfbfbf",
    borderWidth: 1,
  },
});

const InvoicePDFDocument: React.FC<InvoicePdf> = (props: InvoicePdf) => {
  const invoice = props.invoice;
  const rental = props.rental;
  const customer = props.customer;
  const rentalExtra = props.rentalExtras;

  const currentDate = formatDateToStringDate(new Date());

  const getFutureDate = (): string => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 20);
    return formatDateToStringDate(currentDate);
  };
  const dueDate = getFutureDate();  // Payment must be made within 20 days height={700} width={630}

  return (
        <div className="col">
          <PDFViewer height={400} width={300}>
            <Document style={{ height: 1000, width: 600 }}>
              <Page size="A4" style={styles.page}>
                {/* Left section */}
                <View style={styles.section}>
                  {/* Invoice */}
                  <Text
                    style={{
                      fontSize: 25,
                      marginBottom: 10,
                      fontWeight: "bold",
                      color: "blue",
                    }}
                  >
                    INVOICE
                  </Text>

                  {/* Your company logo */}
                  <Image style={styles.logo} src="/images/roboride.jpeg" />

                  {/* Invoice number */}
                  <Text>Invoice No: {`${invoice.invoiceNo}`}</Text>

                  {/* Invoice Date */}
                  <Text>Invoice Date: {currentDate}</Text>

                  {/* Due Date */}
                  <Text>Due Date: {dueDate}</Text>

                  {/* Customer details */}

                  <>
                    <Text style={{ fontSize: 20, marginBottom: 50 }}>
                      Bill to: {`${customer.firstName} ${customer.lastName}`}
                    </Text>
                  </>

                  {/* Table */}
                  <View style={styles.table}>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableCell, { width: 200 }]}>
                        Description
                      </Text>
                      <Text style={[styles.tableCell, { width: 100 }]}>
                        Price
                      </Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableCell, { width: 200 }]}>
                        Car Rental
                      </Text>
                      <Text style={[styles.tableCell, { width: 100 }]}>
                        {rental.totalPrice}
                      </Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableCell, { width: 200 }]}>
                        Insurance: {rentalExtra.insurance.header}
                      </Text>
                      <Text style={[styles.tableCell, { width: 100 }]}>
                        {rentalExtra.insurance.price}
                      </Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text style={[styles.tableCell, { width: 200 }]}>
                        Extra:{" "}
                        {rentalExtra.extraServices
                          .map((response) => response.header)
                          .join(", ")}
                      </Text>
                      <Text style={[styles.tableCell, { width: 100 }]}>
                        {rentalExtra.extraServices.reduce(
                          (total, service) => total + service.price,
                          0
                        )}
                      </Text>
                    </View>
                  </View>

                  {/* Total Price and Tax */}
                  <Text>Tax: {invoice.taxRate} TL</Text>
                  <Text
                    style={{
                      fontSize: 20,
                      marginBottom: 150,
                      fontWeight: "bold",
                      color: "",
                    }}
                  >
                    Total Price: {parseFloat(invoice.totalPrice.toFixed(2))} TL
                  </Text>

                  {/* Terms and Conditions */}
                  <Text
                    style={{
                      fontSize: 15,
                      marginBottom: 5,
                      textDecoration: "underline",
                    }}
                  >
                    Terms and Conditions:
                  </Text>
                  <Text style={{ fontSize: 15, marginBottom: 5 }}>
                    Please pay within 20 days by PayPal
                  </Text>
                </View>

                {/* Right section */}
                <View style={styles.section}>
                  {/* Additional information */}
                  <Text style={{ fontSize: 30, marginBottom: 10 }}>
                    RoboRide
                  </Text>
                  <Text style={{ fontSize: 15, marginBottom: 10 }}>
                    RENTAL SERVICES
                  </Text>
                  <Text style={{ fontSize: 13, marginBottom: 10 }}>
                    Istanbul Airport
                  </Text>
                  <Text style={{ fontSize: 13, marginBottom: 10 }}>
                    Terminal Caddesi
                  </Text>
                  <Text style={{ fontSize: 13, marginBottom: 10 }}>
                    No:1, 34283
                  </Text>
                  <Text style={{ fontSize: 13, marginBottom: 10 }}>
                    Arnavutköy/Istanbul
                  </Text>
                </View>
              </Page>
            </Document>
          </PDFViewer>
        </div>

  );
};

export default InvoicePDFDocument;
