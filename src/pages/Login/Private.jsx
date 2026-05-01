import React from 'react'
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../../hooks/useAuthStore";


const Private = ({ children }) => {
    const authenticate = useAuthStore((state) => state.authenticate);
    console.log(useAuthStore.getState());
    return authenticate ? children : <Navigate to="/login" replace />;
  };

  export default Private