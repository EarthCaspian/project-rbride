import { Navigate } from 'react-router-dom';
import RoleService from '../services/RoleService';
import { useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';

function CarSelectionCheck ({children}: any) {
  
    const rentalCarId = useSelector((state: RootState) => state.rental.rental.car.id);
    const role = RoleService.getRole();
  
    if (!role || role.toLowerCase() !== "user" || rentalCarId=== 0) {
      return <Navigate to={"/"}/>;
    }
  
    return children;
  }

  export default CarSelectionCheck;