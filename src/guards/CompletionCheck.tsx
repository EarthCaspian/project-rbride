import { Navigate } from 'react-router-dom';
import RoleService from '../services/RoleService';
import { useSelector } from 'react-redux';
import { RootState } from '../store/configureStore';

function CompletionCheck({children}: any) {

    const customer = useSelector((state: RootState) => state.customer.customer.firstName);
    const role = RoleService.getRole();
  
    if (!role || role.toLowerCase() !== "user" || customer === "") {
      return <Navigate to={"/"}/>;
    }
  
    return children;
  }
  
  export default CompletionCheck;