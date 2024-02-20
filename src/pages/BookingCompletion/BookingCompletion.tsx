import React, { useEffect } from "react";
import BookingStepsCard from "../../components/BookingStepsCard/BookingStepsCard";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/configureStore";
import InvoiceService from "../../services/InvoiceService";
import RentalService from "../../services/RentalService";
import { InvoiceModel } from "../../models/response/Invoice.Model";
import { RentalIdRequestModel } from "../../models/requests/RentalIdRequestModel";
import { handleRentalIdForInvoice } from "../../store/invoiceSlice";
import { formatStringDate } from "../../utils/formatDate";
import { IconComponent } from "../../utils/icons";
import GoogleMapLocations from "../../utils/GoogleMapLocations";
import InvoicePDFDocument from "../../components/InvoicePDFDocument/InvoicePDFDocument";
import { clearAllStatesForRental } from "../../store/rentalSlice";
import { clearAllFilters } from "../../store/filterSlice";
import { setStepLevel } from "../../store/stepsSlice";

type Props = {};

const BookingCompletion: React.FC = (props: Props) => {
  const dispatch = useDispatch();
  const rentalState = useSelector((state: RootState) => state.rental.rental);
  const rentalLocationsState = useSelector((state: RootState) => state.rental.locations);
  const invoiceState = useSelector((state: RootState) => state.invoice.invoice);
  const rentalExtraState = useSelector((state: RootState) => state.rental);
  const customer = useSelector((state: RootState) => state.customer.customer);
  const userState = useSelector((state: RootState) => state.user)


  useEffect(() => {
    FetchRentalId();
    dispatch(setStepLevel(0));
    dispatch(clearAllFilters());
     return () => {
      dispatch(clearAllStatesForRental());
    }
  }, []);

  //  Fetching rentalId
  const FetchRentalId = () => {
    const rentalIdRequestModel: RentalIdRequestModel = {
      startDate: rentalState.startDate,
      endDate: rentalState.endDate,
      carId: rentalState.car.id,
      userId: userState.userId,
    };
  
    RentalService.getRentalId(rentalIdRequestModel)
      .then((response) => {
        console.log("Rental id fetched: ", response.data);
        dispatch(handleRentalIdForInvoice([response.data]));

        const invoiceModel: InvoiceModel = {
          invoiceNo: invoiceState.invoiceNo,
          totalPrice: invoiceState.totalPrice,
          discountRate: invoiceState.discountRate,
          taxRate: invoiceState.taxRate,
          rentalId: response.data.id,
        };
        return InvoiceService.add(invoiceModel);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <BookingStepsCard stepPage="StepCompletion"></BookingStepsCard>

      <div className="container text-center mt-5">
        <h2 className="">Thank you for selecting our services!</h2>
        <p>
          <IconComponent iconName="Mailbox" />
          Booking details have been sent to your email address. Please check
          your mailbox.
        </p>

        {/* Booking Summary Card */}
        <div className="card mb-3">
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={rentalState.car.imagePath}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h2 className="card-title">Reservation Overview</h2>

                <h3 className="card-text">
                  <strong>
                    {" "}
                    {rentalState.car.model.brand.name +
                      " " +
                      rentalState.car.model.name}{" "}
                  </strong>
                </h3>
                <p>
                  <IconComponent iconName="CarFromFront" />
                  Manuel
                  {"   "}
                  <IconComponent iconName="FuelPump" />
                  Benzin - Our cars come with a full tank.
                </p>

                <p className="card-text mb-1">We kindly remind you! </p>

                <p className="card-text text-body-secondary mb-1">
                  <small>
                    Any changes to the rental period must be communicated and
                    agreed upon by both parties.Renters must possess a valid
                    driver's license and meet the minimum age requirement as per
                    local regulations.
                  </small>
                </p>
                <p className="card-text text-body-secondary mb-1">
                  <small>
                    The rented vehicle is for personal use only and may not be
                    used for commercial purposes unless specified and agreed
                    upon.
                  </small>
                </p>

                <p className="card-text">
                  <small className="text-body-secondary">
                    Should you have any inquiries regarding the booking details,
                    please don't hesitate to contact us!
                  </small>
                </p>
                <h6>
                  Contact with us
                  <IconComponent iconName="Telephone" />
                  0212 444 55 88
                </h6>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mb-4">
        <div className="row">
          <div className="col-4 mx-auto">
            <div className="">
              <h4>Pick-up Information</h4>
              <p>
                <IconComponent iconName="Clock" />
                {formatStringDate(rentalState.startDate)}
              </p>
              <GoogleMapLocations locationName={rentalLocationsState.pickUp?.name} />
            </div>
          </div>
          <div className="col-4 mx-auto">
            <div className="">
              <h4>Drop-off Information</h4>
              <p>
                <IconComponent iconName="Clock" />
                {formatStringDate(rentalState.endDate)}
              </p>
              <GoogleMapLocations locationName={rentalLocationsState.dropOff?.name} />
            </div>
          </div>
        </div>
      </div>

      <InvoicePDFDocument
        customer={customer}
        invoice={invoiceState}
        rental={rentalState}
        rentalExtras={rentalExtraState}
      />
    </div>
  );
};

export default BookingCompletion;
