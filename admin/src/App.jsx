import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AddItems from './pages/AddItems/AddItems';
import ListItems from './pages/ListItems/ListItems';
import Orders from './pages/Orders/Orders';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
    return (
        <div>
            <ToastContainer />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/addItems" element={<AddItems />} />
                <Route path="/listItems" element={<ListItems />} />
                <Route path="/orders" element={<Orders />} />
            </Routes>
        </div>
    );
};

export default App;
