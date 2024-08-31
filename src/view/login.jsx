import reg from "../assets/IllustrasiLogin.png";
import { CgMail } from "react-icons/cg";
import { RiLockPasswordFill } from "react-icons/ri";
import AddContenHooks from "../service/regis";
import { Link } from "react-router-dom";
import logo from "../assets/Logo.png";
const LoginForm = () => {
  const { data, method } = AddContenHooks();

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-full md:max-w-[90%] lg:max-w-[70%] bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden">
        <div className="flex flex-1 items-center justify-center p-6 bg-gray-50 border-gray-200">
          <form onSubmit={method.handleLogin} className="w-full max-w-md">
            <div className="space-y-4 ">
              <div className="flex flex-col items-center" >
                <div className="flex gap-4 items-center">
                  <img
                    src={logo}
                    alt="avatar"
                    className="rounded-full "
                  />
                  <h2 className="text-2xl font-bold text-center md:text-left text-red-500">
                    SIMS PPOB
                  </h2>
                </div>
                <p className="text-lg text-gray-600 text-center md:text-left">
                  Masuk atau buat akun untuk memulai
                </p>
              </div>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) =>
                    method.setPayload({
                      ...data.payload,
                      email: e.target.value,
                    })
                  }
                  className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <CgMail />
                </div>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="Password"
                  onChange={(e) =>
                    method.setPayload({
                      ...data.payload,
                      password: e.target.value,
                    })
                  }
                  className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <RiLockPasswordFill />
                </div>
              </div>
              <button
                type="submit"
                className="w-full mt-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none"
              >
                Registrasi
              </button>
              <p className="text-sm text-gray-500 text-center md:text-left">
                Belom memiliki akun?{" "}
                <Link to="/register" className="text-red-500">
                  Register sekarang
                </Link>
              </p>
            </div>
          </form>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <img
            src={reg}
            alt="3D Illustration"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
