import { Navigate } from 'react-router-dom';
import RoleService from '../services/RoleService';

function LoginCheck ({children}: any) {

  const role = RoleService.getRole();

  if (!role || role.toLowerCase() !== "user") {
    return <Navigate to={"/"}/>;
  }

  return children;
}

export default LoginCheck;