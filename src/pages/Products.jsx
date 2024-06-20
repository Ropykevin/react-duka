import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../Confiq';

const Products = () => {
    const token = localStorage.getItem('token');

    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const [formData, setFormData] = useState({
        name: '',
        cost: '',
        price: '',
        stock_quantity: '',
    });

    useEffect(() => {
        fetchProducts();
    }, []); // Fetch products on component mount

    const fetchProducts = async () => {
        try {
            const response = await axios.get(`${URL}/products`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProducts(response.data);
            console.log('Fetched products:', response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
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
            const response = await axios.post(`${URL}/products`, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            console.log('Product added:', response.data);
            setFormData({
                name: '',
                cost: '',
                price: '',
                stock_quantity: '',
            });
            toggleModal();
            fetchProducts(); // Refresh products list after adding new product
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    return (
        <div className="container mx-auto py-4">
            <h2 className="mb-4 text-2xl font-bold">Manage Products</h2>
            <button
                onClick={toggleModal}
                className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
            >
                Add Product
            </button>

            {/* Modal Component */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
                    <div className="bg-white rounded-lg p-8 max-w-sm w-full relative">
                        <h2 className="text-2xl font-bold mb-4">Add Product</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input p-2 border border-gray-300 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="number"
                                    name="cost"
                                    placeholder="Cost"
                                    value={formData.cost}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input p-2 border border-gray-300 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="Price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    required
                                    className="form-input p-2 border border-gray-300 rounded w-full"
                                />
                            </div>
                            <div className="mb-4">
                                <input
                                    type="number"
                                    name="stock_quantity"
                                    placeholder="Stock Quantity"
                                    value={formData.stock_quantity}
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
                                    Add Product
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

            {products.length > 0 ? (
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2">Id</th>
                            <th className="py-2">Name</th>
                            <th className="py-2">Cost</th>
                            <th className="py-2">Price</th>
                            <th className="py-2">Stock Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="border px-4 py-2">{product.id}</td>
                                <td className="border px-4 py-2">{product.name}</td>
                                <td className="border px-4 py-2">{product.cost}</td>
                                <td className="border px-4 py-2">{product.price}</td>
                                <td className="border px-4 py-2">{product.stock_quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No products found.</p>
            )}
        </div>
    );
};

export default Products;
