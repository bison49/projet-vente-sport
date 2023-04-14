/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate, useLocation } from 'react-router-dom';

import useToken from './Auth/useToken';

const ProtectedRoute = ({ children }: any) => {
  const { token } = useToken();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }

  return children;
};

export default ProtectedRoute;
