import React from 'react'

type Props = {}

export const AccordionsCard = (props: Props) => {
    return (
    <div className="accordion" id="accordionPanelsStayOpenExample">
        
        {/* VEHICLE SPECIFICATIONS */}
        <div id='Vehicle-Specifications' className="accordion-item">
            {/* Header */}
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne" style={{backgroundColor:"#e8e8e8"}}>
                    Vehicle Specifications
                </button>
            </h2>
            {/* Body */}
            <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse">
                <div className="accordion-body">
                    <ul>
                        <li>5 Adults</li>
                        <li>2 Big Suitcases</li>
                        <li>Passenger Airbag</li>
                        <li>ABS</li>
                        <li>Diesel/Gasoline</li>
                        <li>Automatic</li>
                    </ul>
                </div>
            </div>
        </div>
        
        {/* RENTAL CONDITIONS */}
        <div id='Rental-Conditions' className="accordion-item mt-1">
            {/* Header */}
            <h2 className="accordion-header">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo" style={{backgroundColor:"#e8e8e8"}}>
                    Rental Conditions
                </button>
            </h2>
            {/* Body */}
            <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse">
                <div className="accordion-body">
                    <ul>
                        <li>21 Years and Over</li>
                        <li>Driving Licence Age 1 and Over</li>
                        <li>1 Credit Card</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    )
}