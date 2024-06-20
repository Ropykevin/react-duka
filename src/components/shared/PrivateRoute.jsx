import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ element, ...rest }) => {
    const { isLoggedIn } = useAuth(); 

    return (
        <Route
            {...rest}
            element={isLoggedIn ? element : <Navigate to="/login" />}
        />
    );
};

export default PrivateRoute;
