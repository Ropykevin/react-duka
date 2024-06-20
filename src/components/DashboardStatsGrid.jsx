import React, { useEffect, useState } from 'react'
import { IoBagHandle, IoPieChart, IoPeople, IoCart } from 'react-icons/io5'
import axios from 'axios'
import { URL } from '../Confiq';

export default function DashboardStatsGrid() {
	const [totalSales, setTotalSales] = useState(0);
	const [totalExpenses, setTotalExpenses] = useState(0);
	const [totalCustomers, setTotalCustomers] = useState(0);

	const token = localStorage.getItem('token');

	useEffect(() => {
		async function fetchTotalSales() {
			try {
				if (!token) {
					throw new Error('Access token not found');
				}
				const response = await axios.get(`${URL}/total_sales`, {
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					withCredentials: true
				});
				setTotalSales(response.data.total_sales);
			} catch (error) {
				console.error('Error fetching total sales:', error);
			}
		}
		fetchTotalSales();
		async function fetchTotalExpenses() {
			try {
				if (!token) {
					throw new Error('Access token not found');
				}
				const response = await axios.get(`${URL}/expenses`, {
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					withCredentials: true
				});
				setTotalExpenses(response.data.total_expenses);
			} catch (error) {
				console.error('Error fetching total expenses:', error);
			}
		}

		fetchTotalExpenses();
		async function fetchTotalCustomers() {
			try {
				if (!token) {
					throw new Error('Access token not found');
				}
				const response = await axios.get(`${URL}/total_customers`, {
					headers: {
						'Authorization': `Bearer ${token}`,
						'Content-Type': 'application/json'
					},
					withCredentials: true
				});
				setTotalCustomers(response.data.total_customers);
			} catch (error) {
				console.error('Error fetching total customers:', error);
			}
		}

		fetchTotalCustomers();
	}, [token]);
	return (
		<div className="flex gap-4">
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
					<IoBagHandle className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Sales</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">${totalSales.toFixed(2)}</strong>
						<span className="text-sm text-green-500 pl-2">+343</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
					<IoPieChart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Expenses</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">${totalExpenses.toFixed(2)}</strong>
						<span className="text-sm text-green-500 pl-2">-343</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-400">
					<IoPeople className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Customers</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">{totalCustomers}</strong>
						<span className="text-sm text-red-500 pl-2">-30</span>
					</div>
				</div>
			</BoxWrapper>
			<BoxWrapper>
				<div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-600">
					<IoCart className="text-2xl text-white" />
				</div>
				<div className="pl-4">
					<span className="text-sm text-gray-500 font-light">Total Orders</span>
					<div className="flex items-center">
						<strong className="text-xl text-gray-700 font-semibold">16432</strong>
						<span className="text-sm text-red-500 pl-2">-43</span>
					</div>
				</div>
			</BoxWrapper>
		</div>
	)
}

function BoxWrapper({ children }) {
	return <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">{children}</div>
}
