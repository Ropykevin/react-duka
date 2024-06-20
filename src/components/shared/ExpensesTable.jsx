import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ExpensesTable() {
    const [expenses, setExpenses] = useState([]);
    const url = 'http://localhost:8000/'; // Update with your backend URL
    const token = localStorage.getItem('token'); // Or however you store your token

    useEffect(() => {
        async function fetchExpenses() {
            try {
                if (!token) {
                    throw new Error('Access token not found');
                }
                const response = await axios.get(`${url}expenses`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                });
                setExpenses(response.data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        }

        fetchExpenses();
    }, [token, url]);

    return (
        <div className="mt-4">
            <h2 className="text-lg font-semibold mb-4">All Expenses</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td className="px-6 py-4 whitespace-nowrap">${expense.amount.toFixed(2)}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{expense.description}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{new Date(expense.created_at).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ExpensesTable;
