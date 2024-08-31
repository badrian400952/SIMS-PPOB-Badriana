import { getBalance, topup } from "@/store/slice/balance";
import useNotification from "@/utils/alert";
import { useState } from "react";
import { useDispatch } from "react-redux";

const TopupHooks = () => {
  const dispatch = useDispatch();
  const { notifSuccess, notifError } = useNotification();
  const [selectedAmount, setSelectedAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");

  const handleAmountClick = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleInputChange = (event) => {
    setCustomAmount(event.target.value);
    setSelectedAmount("");
  };

  const handleSubmit = async () => {
    const amountToTopUp = customAmount || selectedAmount;
    if (amountToTopUp) {
      try {
        const ress = await dispatch(topup(amountToTopUp));
        await dispatch(getBalance());
        if (ress.error) {
          notifError(
            `Gagal Melakukan Login: ${
              ress.error.message || "Terjadi kesalahan"
            }`
          );
          return;
        }
        notifSuccess(`Berhasil Top Up sebesar Rp ${ress.meta.arg}`);
      } catch (error) {
        notifError(` ${error.response.data.message || "Terjadi kesalahan"}`);
      }
    } else {
      notifError("No amount selected");
    }
  };

  return {
    data: {
      customAmount,
      selectedAmount,
    },
    method: {
      handleAmountClick,
      handleInputChange,
      handleSubmit,
    },
  };
};

export default TopupHooks;
