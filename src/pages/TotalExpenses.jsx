import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../Confiq';

const TotalExpenses = () => {
    const token = localStorage.getItem('token');

    const [expenses, setExpenses] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const [formData, setFormData] = useState({
        amount: '',
        description: '',
    });

    useEffect(() => {
        fetchExpenses();
    }, [token]); // Fetch expenses on component mount

    const fetchExpenses = async () => {
        try {
            const response = await axios.get(`${URL}/expenses`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setExpenses(response.data);
            console.log('Fetched Expenses:', response.data);
        } catch (error) {
            console.error('Error fetching expenses:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!token) {
                console.error('No token found');
                return;
            }
            const response = await axios.post(`${URL}/expenses`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Expense added:', response.data);
            setFormData({
                amount: '',
                description: '',
            });
            toggleModal();
            fetchExpenses(); // Refresh expenses list after adding new expense
        } catch (error) {
            console.error('Error adding expense:', error);
        }
    };

    return (
        <div className="container mx-auto py-4">
            <h2 className="mb-4 text-2xl font-bold">Manage Expenses</h2>
            <button
                onClick={toggleModal}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
            >
                Add Expense
            </button>

            {/* Modal Component */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                    <div className="bg-white rounded-lg p-8 max-w-sm w-full relative">
                        <h2 className="text-2xl font-bold mb-4">Add Expense</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="Amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input p-2 border border-gray-300 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="description"
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input p-2 border border-gray-300 rounded w-full"
                                />
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                >
                                    Add Expense
                                </button>
                            </div>
                        </form>
                        <button
                            className="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-600"
                            onClick={toggleModal}
                        >
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            {expenses.length > 0 ? (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2">Id</th>
                            <th className="py-2">Amount</th>
                            <th className="py-2">Description</th>
                            <th className="py-2">Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td className="border px-4 py-2">{expense.id}</td>
                                <td className="border px-4 py-2">{expense.amount}</td>
                                <td className="border px-4 py-2">{expense.description}</td>
                                <td className="border px-4 py-2">{expense.created_at}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No expenses found.</p>
            )}
        </div>
    );
};

export default TotalExpenses;
