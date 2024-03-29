import React, { useEffect, useState } from 'react'
import { CarModel } from '../../models/response/CarModel';
import CarService from '../../services/CarService';
import { useNavigate, useParams } from 'react-router-dom';
import '../../components/CarDetailsCards/CarDetails.css'
import { CarDetailsCard } from '../../components/CarDetailsCards/CarDetailsCard';
import { ReservationDetailsCard } from '../../components/CarDetailsCards/ReservationDetailsCard/ReservationDetailsCard';
import { FooterCard } from '../../components/CarDetailsCards/FooterCard';
import BookingStepsCard from '../../components/BookingStepsCard/BookingStepsCard';
import { useDispatch } from "react-redux";
import { setReferringPage } from '../../store/referringPageSlice';


type Props = {}

export const CarDetails = (props: Props) => {

    const [car, setCar] = useState<CarModel>();
    const params = useParams<{id:string}>();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    dispatch(setReferringPage(`/car-details/${params.id}`))

    useEffect(() => {
      fetchCar();
    }, []);
  
    const fetchCar = () => {
        if (params.id) {
            CarService.getById(parseInt(params.id)).then((response) => {
                if (response.data) {
                    setCar(response.data);
                }
                else {
                    navigate('*');
                }
            })
            .catch((error) => {
                navigate('*');
            }) ;
        }
    };
    
  return (
    <div>
        {/* BODY */}
        <div className='row d-flex justify-content-center'>
            <BookingStepsCard stepPage='ChooseCar'></BookingStepsCard>
            {/* CAR DETAILS */}
            <div id='car-details'className='col-lg-8 col-md-12  d-flex align-items-center' >
                {car !== undefined && <CarDetailsCard car={car} />}
            </div>
            {/* PAYMENT DETAILS */}
            <div id='payment-details' className='col-lg-4 col-md-12 col-12 d-flex align-items-center'>
                {car !== undefined && <ReservationDetailsCard car={car} />}
            </div>
        </div >
        {/* FOOTER */}
        <FooterCard />
    </div>
    )
}