import { getBalance } from "@/store/slice/balance";
import { handleBayar } from "@/store/slice/bayar";
import useNotification from "@/utils/alert";
import { useState } from "react";
import { useDispatch } from "react-redux";

const BayarHooks = () => {
  const [payload, setPayload] = useState({});
  const dispatch = useDispatch();
  const { notifSuccess, notifError } = useNotification();

  const handleSubmit = async () => {
    const dataPayload = {
      service_code: payload.service_code,
    };
    try {
      const ress = await dispatch(handleBayar(dataPayload));
      if (ress.error) {
        notifError(
          `Gagal Melakukan Pembayaran: ${
            ress.error.message || "Terjadi kesalahan"
          }`
        );
        return;
      }
      notifSuccess(
        `Berhasil Membayar ${payload.service_name} sebesar Rp ${ress.payload.total_amount}`
      );
      dispatch(getBalance());
    } catch (error) {
      let errorMessage = "Gagal Melakukan Pembayaran";
      if (error.response && error.response.data) {
        errorMessage = error.response.message || errorMessage;
      } else if (error.message) {
        errorMessage = "Saldo tidak mencukupi";
      }
      notifError(errorMessage);
    }
  };

  return {
    data: {
      payload,
    },
    method: {
      setPayload,
      handleSubmit,
    },
  };
};

export default BayarHooks;
