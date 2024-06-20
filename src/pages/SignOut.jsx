import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const history = useNavigate();

    const handleLogout = () => {
        // Clear token or session data
        localStorage.removeItem('token'); // Remove token from local storage

        // Redirect to login page or another route
        history('/login'); // Redirect to the login page after logout
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">Logout</h2>
                <p>Are you sure you want to logout?</p>
                <button
                    onClick={handleLogout}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mt-4"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Logout;
