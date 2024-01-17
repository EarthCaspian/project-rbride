import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { CarModel } from '../../models/response/CarModel'
import { addToCart } from '../../store/cartSlice';

type Props = {
    car?: CarModel;
    screenWidth: boolean;
}

export const PaymentDetailsCard = (props: Props) => {
    const car = props.car;
    const screenWidth = props.screenWidth;
    const [days, setDays] = useState<number>(1);


    const decreaseDays = () => {
        if (days - 1 >= 0)
            setDays(days - 1);
    }

    const increaseDays = () => {
        setDays(days + 1);
    }

    const dispatch = useDispatch();
    const addCarToCart = () => {
        if (car) {
            dispatch(addToCart(car));
        }
    }
    
  return (
    <div className='container-fluid mt-5' style={{marginRight:15}}>
        <div className={`row d-flex justify-content-center ${screenWidth ? 'custom-fixed' : ''}`}>

            {/* PAYMENT TABLE */}
            <table id="payment-table" className='table table-borderless w-75 ' style={{height:0.2}}>
                {/* HEADER */}
                <thead >
                    <tr >
                        <td colSpan={2}>
                            <p className='display-6'> Payment Details </p>
                        </td>
                    </tr>
                </thead>
                {/* BODY */}
                <tbody >
                    {/* Days row */}
                    <tr id='days' className="table-group-divider">
                        <td className='col-6 text-end align-middle'>
                            <h6 style={{color:'rgb(38, 214, 117)'}}> Days :</h6>
                        </td>
                        <td className='col-6 text-center'>
                            <div className='d-flex justify-content-center'>
                                <div className='col-2'> 
                                    <button className = "btn btn-sm" onClick={decreaseDays} >
                                        <h4> - </h4>
                                    </button>
                                </div>
                                <div className='col-2 d-flex align-items-center justify-content-center'> 
                                    <h5 style={{color:'rgb(38, 214, 117)'}}> {days} </h5> 
                                </div>
                                <div className='col-2'>
                                    <button className = "btn btn-sm" onClick={increaseDays}>
                                        <h4> + </h4>
                                    </button>
                                </div>
                            </div>
                        </td>
                    </tr>
                    {/* Daily price row */}
                    <tr id='daily-price'>
                        <td className='col-6'>
                            <h6> Daily Price: </h6>
                        </td>
                        <td className='col-6 text-center'>
                            <h5>₺{car?.dailyPrice}</h5>
                        </td>
                    </tr>
                    {/* Total price row */}
                    <tr id='total-price'>
                        <td className='col-6'>
                            <h6> Total Price: </h6>
                        </td>
                        <td className='col-6 text-center'>
                            <h5>₺{car?.dailyPrice ?  car?.dailyPrice * days : ''}</h5>
                        </td>
                    </tr>
                </tbody>
            </table>

            {/* BOOK NOW BUTTON */}
            <div id="book-now-button" 
                    className='buton row d-flex justify-content-center'>
                <button className='custom-btn w-75 shadow p-3 mb-5 rounded' onClick={addCarToCart}>
                    <b>Book Now</b>
                </button>
            </div>

        </div>
    </div>
    )
}