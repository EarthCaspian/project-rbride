import React from 'react'
import { CarModel } from '../../models/response/CarModel'
import { AccordionsCard } from './AccordionsCard';

type Props = {
    car : CarModel;
}

export const CarDetailsCard = (props: Props) => {
    const car = props.car;

    return (
    <div className="container-fluid" style={{padding:20, marginTop:75}}>
        <div className='row d-flex align-items-center justify-content-center' >

            {/* CAR IMAGE */}
            <img id='car-img' src={car.imagePath} className="card-img-top img-fluid mb-5" alt='...' style={{maxWidth: 600, borderRadius:25}}/>

            <div className='col d-flex flex-column align-items-end p-0' style={{maxWidth:125}}>
                <img src='/images/boltz.jpeg' className='mb-3' style={{maxWidth: 125,borderRadius:25 , border: '2px solid lightgray'}} alt='...' />
                <p className='text-center'>Included within BOLTZ PROGRAM</p>
            </div>

            {/* CAR DETAILS */}
            <div id='car-details' className='row d-flex align-items-center mt-4 w-75'>
                {/* Brand Name - Model Name */}
                <h3 className='mb-5'> {car.model.brand.name + "   " + car.model.name} </h3>
                {/* Model Year */}
                <p className='card-rating' style={{fontSize:15}}> {car.modelYear + " Model"} </p>
                {/* Color: color-kod */}
                <p className='card-color' style={{fontSize:15}}>{"Color:  "}
                    <button className='card-color btn btn-sm p-2' 
                            style={{backgroundColor: car.color.code, width:5}}>
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