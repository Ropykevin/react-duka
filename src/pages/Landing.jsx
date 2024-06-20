import React from 'react';
import { Link } from 'react-router-dom'; // Assuming React Router is used for navigation

const LandingPage = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="max-w-3xl bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-6 py-8">
                    <h2 className="text-3xl font-bold mb-4">Welcome to OpenShop Sales System</h2>
                    <p className="text-gray-600 mb-6">
                        Manage your sales efficiently with our intuitive sales system.
                    </p>
                    <div className="flex justify-center">
                        <Link
                            to="/register"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
                        >
                            Register
                        </Link>
                        <Link
                            to="/login"
                            className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
                        >
                            Log in
                        </Link>
                    </div>
                </div>
                <div className="bg-gray-200 py-4 px-6 flex items-center justify-between">
                    <p className="text-gray-600">© 2024 OpenShop. All rights reserved.</p>
                    <div className="flex space-x-4">
                        <Link to="/about" className="text-gray-600 hover:text-blue-500">
                            About Us
                        </Link>
                        <Link to="/about" className="text-gray-600 hover:text-blue-500">
                            Contact Us
                        </Link>
                        <Link to="/about" className="text-gray-600 hover:text-blue-500">
                            Privacy Policy
                        </Link>                       
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
