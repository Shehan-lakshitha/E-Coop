import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import FailedMsg from '../components/failed-msg';
import { useNavigate } from 'react-router-dom';
// import LoginBg from '../assets/images/login/login-signup-image.jpg';
import { IoIosEye } from 'react-icons/io';
import { IoIosEyeOff } from 'react-icons/io';

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChanges = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const validateForm = (formData) => {
        const errors = {};

        if (!formData.email.trim()) {
            errors.email = 'Email is required';
        }

        if (!formData.password) {
            errors.password = 'Password is required';
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const errors = validateForm(formData);
        if (Object.keys(errors).length > 0) {
            return setErrors(errors);
        }

        try {
            const response = await axios.post(
                'https://food-delivery-system-for-gather-and-grab-kzp59bwbm.vercel.app/api/auth/login',
                formData
            );
            console.log(response);

            if (response.status === 200) {
                alert('Login Successful!');
                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('role', response.data.role);

                if (
                    response.data.role === 'admin' ||
                    response.data.role === 'super admin'
                ) {
                    navigate('/dashboard');
                } else if (response.data.role === 'user') {
                    navigate('/');
                }
            }
        } catch (err) {
            console.log(err);
            setIsModalOpen(true);
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div
            className="flex items-center min-h-screen justify-center bg-cover bg-center"
            // style={{ backgroundImage: `url(${LoginBg})` }}
        >
            <div className="z-10 items-center justify-center">
                {/* <FailedMsg
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    title="Invalid Credentials"
                    message="Try Again!"
                    link={<Link to={'/login'}>Go to Dashboard</Link>}
                /> */}
            </div>
            <div
                className={`w-full max-w-4xl p-3   m-2 border-solid rounded-lg shadow-lg sm:pt-14 pb-10 sm:m-6 bg-white/10 backdrop-blur-lg lg:w-1/2 xl:w-1/3 ${
                    isModalOpen ? 'pointer-events-none blur-sm' : ''
                }`}
            >
                <h1 className="font-bold text-lg sm:text-2xl text-center text-[#fdb560] mb-8 font-poppins">
                    WELCOME BACK TO YUMZY
                </h1>
                <div className="sm:p-8 p-4 pb-10 pt-10 shadow-lg rounded-[50px] bg-white/20">
                    <h3 className="pb-5 font-semibold text-center text-black sm:text-xl lg:text-lg">
                        Login!
                    </h3>
                    <form
                        method="POST"
                        className="space-y-4 "
                        onSubmit={handleSubmit}
                        noValidate
                    >
                        <div className="form-details">
                            <label htmlFor="email" className="email">
                                Email
                            </label>
                            <div className="">
                                <input
                                    type="text"
                                    id="email"
                                    value={formData.email}
                                    onChange={handleInputChanges}
                                    className=""
                                    placeholder="Enter your email"
                                />
                                {errors.email && (
                                    <div className="error-message">
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div>
                            <div className="">
                                <label htmlFor="password" className="password">
                                    Password
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={formData.password}
                                    onChange={handleInputChanges}
                                    className=""
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    className=""
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <IoIosEye />
                                    ) : (
                                        <IoIosEyeOff />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <div className="error-message">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#c59d5f] hover:bg-[#fccb45] rounded-lg p-2 text-sm sm:text-lg"
                        >
                            Login
                        </button>

                        <p className="text-sm text-center text-white sm:text-lg">
                            Not a member?{' '}
                            <Link
                                to="/registration"
                                className="text-[#c59d5f] no-underline hover:text-[#fccb45] font-semibold"
                            >
                                Signup
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
