import React, { useState, useEffect } from 'react';
import './Rentals.css';
import Sidebar from '../Sidebar/Sidebar';
import RentalService from '../../../services/RentalService';
import { GetRentalByUserIdRequest } from '../../../models/response/RentalModel';

const Rentals = ({ token }: { token: string }) => {
    const [rentals, setRentals] = useState<GetRentalByUserIdRequest[]>([]);

    useEffect(() => {
        if (!token) return;

        RentalService.getRentals(token)
            .then((data: GetRentalByUserIdRequest[]) => {
                setRentals(data);
            })
            .catch(error => console.error('Error fetching user rentals:', error));
    }, [token]);

    return (
        <div className="rentals">
            <Sidebar />
            <h2>My Rentals</h2>
            <ul>
                {rentals.map((rental, index) => (
                    <li key={index}>
                        Car: {rental.car}<br />
                        Start Date: {rental.startDate}<br />
                        Return Date: {rental.returnDate}<br />
                        Total Price: {rental.totalPrice}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Rentals;