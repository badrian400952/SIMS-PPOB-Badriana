import React from "react";
import { Outlet, Link as RouterLink, useNavigate } from "react-router-dom";
import { IoIosClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import logo from "../../assets/Logo.png";
import { logout } from "@/store/slice/register";
import { useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenLayoute, setIsOpenLayoute] = React.useState(false);
  const navigate = useNavigate()
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout())
    navigate('/layoutenav')
  }

  return (
    <div className="bg-white px-4 relative">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="avatar"
            className="rounded-full"
          />
          <div>
            <RouterLink
              to="/"
              className="px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
            >
              <p className="text-lg font-bold">SIMS PPOB</p>
            </RouterLink>
          </div>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <RouterLink
            to="/topup"
            className="px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
          >
            Top up
          </RouterLink>
          <RouterLink
            to="/transaction"
            className="px-2 py-1 text-sm text-gray-600 hover:text-gray-800"
          >
            Transaction
          </RouterLink>
          <p
            onClick={() => setIsOpenLayoute(!isOpenLayoute)}
            className="px-2 py-1 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
          >
            Akun
          </p>

        </div>
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Open Menu"
        >
          {isOpen ? <IoIosClose /> : <RxHamburgerMenu />}
        </button>
      </div>

      {/* Akun Dropdown Menu */}
      {isOpenLayoute && (
        <div className="fixed right-4 top-16 bg-white shadow-md rounded-md z-50">
          <RouterLink
            onClick={() => setIsOpenLayoute(false)}
            to="/profil"
            className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
          >
            Akun
          </RouterLink>
          <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
            Log out
          </button>
        </div>
      )}

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden pb-4 bg-white shadow-md rounded-md z-50">
          <div className="flex flex-col">
            <RouterLink
              to="/topup"
              className="py-2 px-4 text-sm text-gray-600 hover:text-gray-800"
            >
              Top up
            </RouterLink>
            <RouterLink
              to="/transaction"
              className="py-2 px-4 text-sm text-gray-600 hover:text-gray-800"
            >
              Transaction
            </RouterLink>
            <p
              onClick={() => setIsOpenLayoute(!isOpenLayoute)}
              className="p-5 py-1 text-sm text-gray-600 hover:text-gray-800 cursor-pointer"
            >
              Akun
            </p>
          </div>
        </div>
      )}
      <Outlet />
    </div>
  );
};

export default Navbar;
