import React, { useEffect, useState } from 'react'
import { CarModel } from '../../models/response/CarModel';
import CarService from '../../services/CarService';
import { Link, useParams } from 'react-router-dom';
import './CarDetails.css'

type Props = {}

export const CarDetails = (props: Props) => {

    const [car, setCar] = useState<CarModel>();
    const [days, setDays] = useState<number>(1);
    const params = useParams<{id:string}>();
    const [screenWidth, setScreenWidth] = useState(false);

    useEffect(() => {
      fetchCar();

      setScreenWidth(window.innerWidth >= 992)

      const handleResize = () => {
          setScreenWidth(window.innerWidth >= 992)
      }

      window.addEventListener('resize', handleResize);

    }, []);
  
    const fetchCar = () => {
        if (params.id) {
            console.log("burada");
            CarService.getById(parseInt(params.id)).then(response => {
                setCar(response.data);
            });
        }
    };

    const decreaseDays = () => {
        if (days - 1 >= 0)
            setDays(days - 1);
    }

    const increaseDays = () => {
        setDays(days + 1);
    }
    
  return (
    <div>
    <div className='row d-flex justify-content-center'>
        <div className='col-lg-8 col-md-12  d-flex align-items-center' >
            <div className="container-fluid" style={{padding:20, marginTop:75}}>
                <div className='row d-flex align-items-center justify-content-center' >
                    <img src='/assets/car.png' className="card-img-top img-fluid rounded-start mb-5" style={{maxWidth: 600}}/>
                    <div className='row d-flex align-items-center mt-4 w-75'>
                        <h3 className='mb-5'>{car?.model.brand.name + "   " + car?.model.name}</h3>
                        <p className='card-rating' style={{fontSize:15}}>{car?.modelYear + " Model"}</p>
                        <p className='card-color' style={{fontSize:15}}>{"Color:  "}
                            <button className='card-color btn btn-sm p-2' style={{backgroundColor: car?.color.code, width:5}}></button></p>
                            <div className="accordion" id="accordionPanelsStayOpenExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="false" aria-controls="panelsStayOpen-collapseOne" style={{backgroundColor:"#e8e8e8"}}>
                                Vehicle Specifications
                            </button>
                        </h2>
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
                    <div className="accordion-item mt-1">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="false" aria-controls="panelsStayOpen-collapseTwo" style={{backgroundColor:"#e8e8e8"}}>
                                Rental Conditions
                            </button>
                        </h2>
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
                    </div>
                </div>
            </div>
        </div>
        <div className='payment-details col-lg-4 col-md-12 d-flex align-items-center'>
            <div className='container-fluid mt-5' style={{marginRight:15}}>
                <div className={`row d-flex justify-content-center ${screenWidth ? 'custom-fixed' : ''}`}>
                    <table className='table table-borderless w-75 ' style={{height:0.2}}>
                        <thead >
                            <tr >
                                <td colSpan={2}>
                                    <p className='display-6'>Payment Details</p>
                                </td>
                            </tr>
                        </thead>
                        <tbody >
                            <tr className="table-group-divider">
                                <td className='col-6 text-end align-middle'>
                                    <h6 style={{color:'rgb(38, 214, 117)'}}>Days :</h6>
                                </td>
                                <td className='col-6 text-center'>
                                    <div className='d-flex justify-content-center'>
                                        <div className='col-2'> 
                                            <button className = "btn btn-sm" onClick={decreaseDays} >
                                                <h4>-</h4>
                                            </button>
                                        </div>
                                        <div className='col-2 d-flex align-items-center justify-content-center'> 
                                            <h5 style={{color:'rgb(38, 214, 117)'}}> {days} </h5> 
                                        </div>
                                        <div className='col-2'>
                                            <button className = "btn btn-sm" onClick={increaseDays}>
                                                <h4>+</h4>
                                            </button>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td className='col-6'><h6>Daily Price: </h6></td>
                                <td className='col-6 text-center'><h5>₺{car?.dailyPrice}</h5></td>
                            </tr>
                            <tr>
                                <td className='col-6'><h6>Total Price: </h6></td>
                                <td className='col-6 text-center'><h5>₺{car?.dailyPrice ?  car?.dailyPrice * days : ''}</h5></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='row d-flex justify-content-center'>
                        <Link to="/" className='custom-btn w-75 shadow p-3 mb-5 rounded'><b>Book Now</b></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div className="card text mt-5">
        <img src="/images/rented2.jpeg" className="card-img" style={{height:300}} alt="..." />
    </div>
    </div>
    )
}