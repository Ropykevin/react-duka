import React, { useEffect, useState, } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { URL } from '../Confiq';


const Sales = () => {
    const navigate=useNavigate()
    const [sales, setSales] = useState([]);
    const [formData, setFormData] = useState({
        pid: 0,
        quantity: 0,
    });
    const [products, setProducts] = useState([]);
    const [modalOpen, setModalOpen] = useState(false); // State to manage modal visibility

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Access token not found');
                }

                const response = await axios.get(`${URL}/sales`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setSales(response.data);
            } catch (error) {
                console.error('Error fetching sales:', error);
            }
        };

        const fetchProducts = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    throw new Error('Access token not found');
                }

                const response = await axios.get('http://127.0.0.1:8000/products', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchSales();
        fetchProducts();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === 'pid' ? parseInt(value, 10) : parseInt(value, 10),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Access token not found');
            }

            await axios.post(`${URL}/sales`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            alert('Sale created successfully');
            navigate('/payments')
            setSales((prevSales) => [...prevSales, formData]); 
            
            closeModal();
        } catch (error) {
            console.error('Error creating sale:', error);
            alert('Failed to create sale');
        }
    };

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        // Reset form data
        setFormData({
            pid: 0,
            quantity: 0,
        });
    };

    return (
        <div className="container mx-auto py-4">
            <h2 className="text-2xl font-bold mb-4">Sales</h2>
            <div className="mb-4">
                <h1 className="text-xl font-bold">Main Page</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={openModal}
                >
                    Add Sale
                </button>
            </div>
            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-gray-800 bg-opacity-75 absolute inset-0"></div>
                    <div className="relative bg-white p-4 rounded-lg">
                        <button
                            className="absolute top-0 right-0 mt-2 mr-2 text-gray-700 hover:text-gray-900"
                            onClick={closeModal}
                        >
                            Close
                        </button>
                        <h2 className="text-xl font-bold mb-4">Create Sale</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Product:
                                </label>
                                <select
                                    name="pid"
                                    value={formData.pid}
                                    onChange={handleChange}
                                    className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                >
                                    <option value={0} disabled>
                                        Select Product
                                    </option>
                                    {products.map((product) => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Quantity:
                                </label>
                                <input
                                    type="number"
                                    name="quantity"
                                    value={formData.quantity}
                                    onChange={handleChange}
                                    className="block w-full mt-1 p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            >
                                Create Sale
                            </button>
                        </form>
                    </div>
                </div>
            )}
            {/* Sales Table */}
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                    <tr>
                        <th className="py-3 px-6 text-left">ID</th>
                        <th className="py-3 px-6 text-left">Quantity</th>
                        <th className="py-3 px-6 text-left">Total Price</th>
                        <th className="py-3 px-6 text-left">Sold At</th>
                        <th className="py-3 px-6 text-left">Product ID</th>
                        <th className="py-3 px-6 text-left">Payment </th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {sales.map((sale) => (
                        <tr
                            key={sale.id}
                            className="border-b border-gray-200 hover:bg-gray-100"
                        >
                            <td className="py-3 px-6 text-left">{sale.id}</td>
                            <td className="py-3 px-6 text-left">{sale.quantity}</td>
                            <td className="py-3 px-6 text-left">{sale.total_price}</td>
                            <td className="py-3 px-6 text-left">{sale.sold_at}</td>
                            <td className="py-3 px-6 text-left">{sale.product_id}</td>
                            <td className="py-3 px-6 text-left">{sale.is_paid}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Sales;
