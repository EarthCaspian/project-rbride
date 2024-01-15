import React from 'react'
import { CarModel } from '../../models/response/CarModel'
import { AccordionsCard } from './AccordionsCard';

type Props = {
    car ?: CarModel;
}

export const CarDetailsCard = (props: Props) => {
    const car = props.car;

    return (
    <div className="container-fluid" style={{padding:20, marginTop:75}}>
        <div className='row d-flex align-items-center justify-content-center' >

            {/* CAR IMAGE */}
            <img id='car-img' src='/assets/car.png' className="card-img-top img-fluid rounded-start mb-5" style={{maxWidth: 600}}/>

            {/* CAR DETAILS */}
            <div id='car-details' className='row d-flex align-items-center mt-4 w-75'>
                {/* Brand Name - Model Name */}
                <h3 className='mb-5'> {car?.model.brand.name + "   " + car?.model.name} </h3>
                {/* Model Year */}
                <p className='card-rating' style={{fontSize:15}}> {car?.modelYear + " Model"} </p>
                {/* Color: color-kod */}
                <p className='card-color' style={{fontSize:15}}>{"Color:  "}
                    <button className='card-color btn btn-sm p-2' 
                            style={{backgroundColor: car?.color.code, width:5}}>
                    </button>
                </p>

                {/* MORE DETAILS */}
                <div id='more-details'>
                    <AccordionsCard />
                </div>
            </div>
        </div>
    </div>        
    )
}