import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/shared/Layout';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Sales from './pages/Sales';
import LandingPage from './pages/Landing';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import Logout from './pages/SignOut'
import Payment from './pages/payment';
import PrivateRoute from './components/shared/PrivateRoute';
import TotalExpenses from './pages/TotalExpenses';
import Customers from './pages/Customers';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* <Route element={<PrivateRoute />}> */}

                <Route element={<Layout />}>

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/sales" element={<Sales />} />
                    <Route path="/payments" element={<Payment />} />
                    <Route path="/expenses" element={<TotalExpenses />} />
                    <Route path="/customers" element={<Customers />} />
                    <Route path="/logout" element={<Logout />} />

                </Route>
                {/* </Route> */}

                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
