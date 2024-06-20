import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { URL } from '../../Confiq'; // Adjust path as per your project structure

Modal.setAppElement('#root');

const AddCustomerModal = ({ isOpen, onClose, onAddCustomer }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleAddCustomer = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${URL}/customers`, {
                name,
                email
            });

            // Clear form fields and close the modal after successfully adding customer
            setName('');
            setEmail('');
            onAddCustomer(response.data); // Pass newly added customer data to parent component
            onClose(); // Close modal
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onClose}
            className="modal"
            overlayClassName="modal-overlay"
            contentLabel="Add Customer Modal"
        >
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Add Customer</h2>
                <form onSubmit={handleAddCustomer}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
                        >
                            Add Customer
                        </button>
                        <button
                            className="ml-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-md shadow-md hover:bg-gray-300 focus:outline-none"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddCustomerModal;
