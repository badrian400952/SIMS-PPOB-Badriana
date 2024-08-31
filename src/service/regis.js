import { useDispatch } from "react-redux";
import { useState } from "react";
import { addDataUser, LoginUser } from "@/store/slice/register";
import { useNavigate } from "react-router-dom";
import useNotification from "@/utils/alert";
const AddContenHooks = () => {
  const { notifSuccess, notifError } = useNotification();
  const dispatch = useDispatch();
  const [payload, setPayload] = useState({});
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const ress = await dispatch(addDataUser(payload));
      if (ress.meta.requestStatus === "rejected") {
        notifError(
          `Gagal Melakukan Register: ${ress.payload.message || "Unknown error"}`
        );
        return;
      }
      navigate("/login");
      notifSuccess("Berhasil Melakukan Register");
    } catch (error) {
      let errorMessage = "Gagal Melakukan Register";
      if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = "Email sudah terdaftar";
      }

      notifError(errorMessage);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const ress = await dispatch(LoginUser(payload));
      if (ress.meta.requestStatus === "rejected") {
        notifError(`Username atau password salah`);
        return;
      }
      navigate("/");
      notifSuccess(ress.error.message);
    } catch (error) {
      notifError(
        `Gagal Melakukan Login: ${
          error.response.data.message || "Terjadi kesalahan"
        }`
      );
    }
  };
  return {
    data: {
      payload,
    },
    method: {
      handleRegister,
      setPayload,
      handleLogin,
    },
  };
};

export default AddContenHooks;
