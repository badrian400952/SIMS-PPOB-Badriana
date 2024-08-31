'use client'

import React, { useEffect } from 'react';
import {
    Link,
    Outlet,
    Navigate,
    useNavigate
} from 'react-router-dom';
import { BsCart4 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { getCheckout } from '../store/product/CheckOutSlice';
import { logout } from '../store/user/UserSlice';
import logos from '../assets/logos.png';
import { IoIosClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";


const Links = ['Dashboard', 'Projects', 'Team'];

const NavLink = ({ children }) => {
    return (
        <a
            href="#"
            className="px-2 py-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700">
            {children}
        </a>
    );
};

export default function ResponsiveAppBar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const dispatch = useDispatch();
    const { checkout } = useSelector((state) => state.checkout);

    useEffect(() => {
        dispatch(getCheckout());
    }, [dispatch]);

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token) {
        return <Navigate to="/layoutenav" />;
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/layoutenav');
    };

    return (
        <>
            <div className="px-4">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between h-16">
                        <button
                            className="md:hidden"
                            onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <IoIosClose /> : <RxHamburgerMenu />}
                        </button>

                        <div className="flex items-center space-x-8">
                            <Link to="/">
                                <img src={logos} alt="logo" className="w-12 h-12" />
                            </Link>
                        </div>

                        <div className="flex items-center">
                            <div className="relative">
                                <button
                                    className="focus:outline-none"
                                    onClick={() => setIsOpen(!isOpen)}>
                                    <img
                                        className="w-8 h-8 rounded-full"
                                        src="#"
                                        alt={`${user.firstName}`}
                                    />
                                </button>
                                <div
                                    className={`${isOpen ? 'block' : 'hidden'
                                        } absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg`}>
                                    <div className="py-3 px-4 text-center">
                                        <img
                                            className="w-24 h-24 rounded-full mx-auto"
                                            src="#"
                                            alt={`${user.firstName}`}
                                        />
                                        <p className="mt-2">Username</p>
                                    </div>
                                    <div className="border-t border-gray-200">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100">
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <Link to="/carts" className="relative ml-4">
                                <div className="relative">
                                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                        {checkout.length}
                                    </span>
                                    <BsCart4 className="w-8 h-8 text-red-600" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                {isOpen && (
                    <div className="md:hidden mt-4">
                        <nav className="space-y-4">
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </nav>
                    </div>
                )}
            </div>
            <Outlet />
        </>
    );
}
