import { Routes, Route, useNavigate } from "react-router-dom";

import RegistrationForm from "./view/register";
import Navbar from "./view/route/navbar";
import HomePage from "./view/page/HomePage";
import HomePageTopup from "./view/page/HomeTopup";
import LoginForm from "./view/login";
import ProfilePage from "./view/page/ProfilePage";
import Transacion from "./view/page/Transaction";
import Bayar from "./view/page/Bayar";
import { useEffect, useState } from "react";

function App() {
  const [dataStorage, setDataStorage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setDataStorage(token);

    const currentPath = window.location.pathname;
    if (!token && currentPath !== "/login" && currentPath !== "/register") {
      navigate("/login");
    } else if (
      token &&
      (currentPath === "/login" || currentPath === "/register")
    ) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        {dataStorage ? (
          <>
            <Route path="/" element={<Navbar />}>
              <Route index element={<HomePage />} />
              <Route path="/topup" element={<HomePageTopup />} />
              <Route path="/profil" element={<ProfilePage />} />
              <Route path="/transaction" element={<Transacion />} />
              <Route path="/bayar/:id" element={<Bayar />} />
            </Route>
          </>
        ) : (
          <>
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
