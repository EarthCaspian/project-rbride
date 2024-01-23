import React from "react";
import BookingStepsCard from "../../components/BookingStepsCard/BookingStepsCard";
import { Link } from "react-router-dom";

type Props = {};

const AdditionalService = (props: Props) => {
  return (
    <div>
      <BookingStepsCard stepPage="AdditionalService"></BookingStepsCard>
      <h4 className="text-center">Are you interested in incorporating our extra services?</h4>
      <div className="container col-6">
        {/* Insurance Type Section */}
        <h4>Insurance Types</h4>
        <div className="accordion" >
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseOne"
                aria-expanded="false"
                aria-controls="collapseOne"
              >
                <div className="container">
                  <div className="row ">
                    <div className="form-check form-switch col-10 ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                      />
                      <label className="form-check-label">
                        Compact Comprehensive Repair Coverage Insurance
                      </label>
                    </div>
                    <div className="text-end pb-1 col-2 ">₺1000</div>
                  </div>
                </div>
              </button>
            </h2>
            <div
              id="collapseOne"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                This insurance option provides comprehensive coverage for
                repairs to the rented vehicle. It encompasses a wide range of
                potential damages, offering protection against various incidents
                that may occur during the rental period. This coverage ensures
                that you can drive with peace of mind, knowing that the costs
                associated with repairs for covered events are taken care of.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseTwo"
                aria-expanded="false"
                aria-controls="collapseTwo"
              >
                <div className="container">
                  <div className="row ">
                    <div className="form-check form-switch col-10 ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                      />
                      <label className="form-check-label">
                        Intermediate Comprehensive Repair Insurance
                      </label>
                    </div>
                    <div className="text-end pb-1 col-2 ">₺1200</div>
                  </div>
                </div>
              </button>
            </h2>
            <div
              id="collapseTwo"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                This insurance level goes beyond the basics, offering a
                comprehensive solution for repair expenses during the rental
                period. It provides coverage for a diverse set of potential
                damages, offering a balance between protection and
                affordability. With Intermediate Comprehensive Repair Insurance,
                you can enjoy your rental experience with added assurance that a
                variety of repair costs are covered.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseThree"
                aria-expanded="false"
                aria-controls="collapseThree"
              >
                <div className="container">
                  <div className="row ">
                    <div className="form-check form-switch col-10 ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                      />
                      <label className="form-check-label">
                        Optimal Comprehensive Repair Insurance
                      </label>
                    </div>
                    <div className="text-end pb-1 col-2 ">₺1500</div>
                  </div>
                </div>
              </button>
            </h2>
            <div
              id="collapseThree"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                The Optimal Comprehensive Repair Insurance represents the
                highest level of coverage available. It extends comprehensive
                protection to cover a broad spectrum of potential damages to the
                rented vehicle. This premium insurance option ensures maximum
                peace of mind, minimizing your financial responsibility for
                covered events. Optimal Comprehensive Repair Insurance is ideal
                for those seeking the highest level of protection during their
                rental period.
              </div>
            </div>
          </div>
        </div>

        {/* Extra Services */}
        <h4 className="mt-3">Extra Services</h4>
        <div className="accordion" >
          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFour"
                aria-expanded="false"
                aria-controls="collapseFour"
              >
                <div className="container">
                  <div className="row ">
                    <div className="form-check form-switch col-10 ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                      />
                      <label className="form-check-label">
                        Child Seat 
                      </label>
                    </div>
                    <div className="text-end pb-1 col-2 ">₺500</div>
                  </div>
                </div>
              </button>
            </h2>
            <div
              id="collapseFour"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
              A car child seat is a specially designed safety restraint system for infants and young children, ensuring their protection during car journeys. At our rental car firm, we provide the option to include a child seat with your rental, offering a secure and comfortable solution for traveling with your little ones.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseFive"
                aria-expanded="false"
                aria-controls="collapseFive"
              >
                <div className="container">
                  <div className="row ">
                    <div className="form-check form-switch col-10 ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                      />
                      <label className="form-check-label">
                        Navigation
                      </label>
                    </div>
                    <div className="text-end pb-1 col-2 ">₺600</div>
                  </div>
                </div>
              </button>
            </h2>
            <div
              id="collapseFive"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Navigation, in the context of our rental car services, refers to the advanced GPS (Global Positioning System) technology equipped in our vehicles. This feature assists drivers in effortlessly finding their way to destinations, providing real-time directions, and enhancing overall travel convenience during your rental period.
              </div>
            </div>
          </div>

          <div className="accordion-item">
            <h2 className="accordion-header">
              <button
                className="accordion-button"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseSix"
                aria-expanded="false"
                aria-controls="collapseSix"
              >
                <div className="container">
                  <div className="row ">
                    <div className="form-check form-switch col-10 ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                      />
                      <label className="form-check-label">
                        Winter Tire
                      </label>
                    </div>
                    <div className="text-end pb-1 col-2 ">₺750</div>
                  </div>
                </div>
              </button>
            </h2>
            <div
              id="collapseSix"
              className="accordion-collapse collapse show"
              data-bs-parent="#accordionExample"
            >
              <div className="accordion-body">
                Winter tires, available as an option with our rental cars, are specially designed tires crafted to provide superior traction and control in cold and snowy conditions. Engineered to enhance safety during winter travel, these tires offer improved grip on icy roads, ensuring a secure driving experience for our customers.
              </div>
            </div>
          </div>
        </div>

        <Link to='/booknow' type="button" className="btn btn-success mt-3">Submit</Link>


      </div>
    </div>
  );
};

export default AdditionalService;
