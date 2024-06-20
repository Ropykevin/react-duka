
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../Confiq';



const RegisterPage = () => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: ''
	});

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({
			...formData,
			[name]: value
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(`${URL}/register`, formData);
			console.log('Registration successful:', response.data);
			navigate("/login");
		} catch (error) {
			console.error('Registration failed:', error);
		}
	};

	return (
		<div className="bg-gray-100 min-h-screen flex items-center justify-center">
			<div className="max-w-md w-full bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
				<h2 className="text-3xl font-bold text-center mb-6">Register Page</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
						<input
							type="text"
							id="username"
							name="username"
							value={formData.username}
							onChange={handleInputChange}
							placeholder="Enter username"
							required
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleInputChange}
							placeholder="Enter email"
							required
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>

					<div className="mb-6">
						<label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleInputChange}
							placeholder="Password"
							required
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						/>
					</div>

					<div className="flex items-center justify-between">
						<button type="submit" className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white focus:outline-none focus:shadow-outline">
							Register
						</button>
					</div>
				</form>

				<p className="text-center text-sm mt-4">
					Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login here</Link>
				</p>
			</div>
		</div>
	);
};

export default RegisterPage;
