import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";


const PrivateFavorite = ({ children }) => {
    const authenticate = useAuthStore((state) => state.authenticate);
    return authenticate ? children : <Navigate to="/login" replace />;
  };

  export default PrivateFavorite