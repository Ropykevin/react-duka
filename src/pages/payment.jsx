import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../Confiq';

const Payment = () => {
    const [sales, setSales] = useState([]);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [receiptLink, setReceiptLink] = useState('');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get(`${URL}/unpaid_sales`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setSales(response.data);
            } catch (error) {
                console.error('Error fetching sales:', error);
            }
        };
        

        if (token) {
            fetchSales();
        }
        
    }, [token]);



    const handlePayment = async () => {
        if (!paymentMethod) {
            alert('Please select a payment method.');
            return;
        }

        setIsLoading(true);
        try {
            const response = await axios.post('URL/payments', { payment_method: paymentMethod }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setReceiptLink(response.data.receipt_filename);
            alert('Payment processed successfully!');
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Payment failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const downloadReceipt = async () => {
        try {
            const response = await axios.get(`URL/receipts/${receiptLink}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', receiptLink);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up after download
        } catch (error) {
            console.error('Error downloading receipt:', error);
            alert('Failed to download receipt. Please try again.');
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Payment</h2>
            {sales.length > 0 ? (
                <div className="bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-xl font-semibold mb-4">Unpaid Sales</h3>
                    <ul className="list-disc pl-4 mb-4">
                        {sales.map((sale) => (
                            <li key={sale.id} className="mb-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg">{sale.product_name}</span>
                                    <span className="text-sm text-gray-600">Quantity: {sale.quantity}</span>
                                    <span className="text-sm text-gray-600">Total Price: ${sale.total_price}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2">
                            Payment Method:
                            <select
                                value={paymentMethod}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="block w-full mt-1 p-2 border border-gray-300 rounded"
                            >
                                <option value="">Select a payment method</option>
                                <option value="cash">Cash</option>
                                <option value="credit_card">Credit Card</option>
                                <option value="paypal">PayPal</option>
                            </select>
                        </label>
                    </div>
                    <button
                        onClick={handlePayment}
                        disabled={isLoading || !paymentMethod}
                        className={`w-full py-2 px-4 font-semibold rounded bg-blue-500 text-white ${isLoading || !paymentMethod ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
                    >
                        {isLoading ? 'Processing...' : 'Make Payment'}
                    </button>
                </div>
            ) : (
                <p className="text-lg text-gray-600 bg-white rounded-lg shadow-md p-4">No unpaid sales found.</p>
            )}
            {receiptLink && (
                <div className="mt-4 bg-white rounded-lg shadow-md p-4">
                    <h3 className="text-xl font-semibold mb-4">Receipt</h3>
                    <button
                        onClick={downloadReceipt}
                        className="py-2 px-4 font-semibold rounded bg-green-500 text-white hover:bg-green-600"
                    >
                        Download Receipt
                    </button>
                </div>
            )}
        </div>
    );
};

export default Payment;
