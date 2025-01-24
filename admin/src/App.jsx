import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Sidebar from './components/Sidebar/Sidebar';
import AddItems from './pages/AddItems/AddItems';
import ListItems from './pages/ListItems/ListItems';
import Orders from './pages/Orders/Orders';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div>
            <ToastContainer />
            <Navbar />
            <div className="app-content">
                <Sidebar />
                <Routes>
                    <Route path="/addItems" element={<AddItems />} />
                    <Route path="/listItems" element={<ListItems />} />
                    <Route path="/orders" element={<Orders />} />
                </Routes>
            </div>
        </div>
    );
};

export default App;
