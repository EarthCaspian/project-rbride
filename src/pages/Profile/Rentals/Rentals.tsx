import React, { useState, useEffect } from 'react';
import './Rentals.css';
import Sidebar from '../Sidebar/Sidebar';
import TokenService from '../../../services/TokenService';
import { GetRentalByUserIdResponse } from '../../../models/response/GetRentalByUserIdResponse';
import RentalGetRentals from '../../../services/RentalGetRentals';

const Rentals = () => {
    const [rentals, setRentals] = useState<GetRentalByUserIdResponse[]>([]);

    useEffect(() => {
        const token = TokenService.getToken();
        if (!token) return;

        RentalGetRentals.getRentals(token)
            .then((data: GetRentalByUserIdResponse[]) => {
                setRentals(data);
            })
            .catch(error => console.error('Error fetching user rentals:', error));
    }, []);

    return (
        <div className="rentals">
            <Sidebar />
            <h2 className="my-rentals-title">My Rentals</h2>
            
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">User</th>
                        <th scope="col">Car</th>
                        <th scope="col">Start Date</th>
                        <th scope="col">End Date</th>
                        <th scope="col">Total Price</th>
                    </tr>
                </thead>
                <tbody>
                    {rentals.map((rental, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>{rental.username}</td>
                            <td>{rental.carPlate}</td>
                            <td>{new Date(rental.startDate).toLocaleDateString()}</td>
                            <td>{new Date(rental.endDate).toLocaleDateString()}</td>
                            <td>{rental.totalPrice} ₺</td>
                        </tr>
                    ))}
                </tbody>
        </table>
        </div>
        
        
    );
};

export default Rentals;