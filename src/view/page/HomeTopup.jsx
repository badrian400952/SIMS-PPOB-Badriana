import BalanceHooks from "@/service/balance";
import ProfilHooks from "@/service/profil";
import TopupHooks from "@/service/topup";
import { formatRupiah } from "@/utils/formatRupiah";
import Modal from "@/utils/modals";

import { useState } from "react";

const HomePageTopup = () => {
  const { data: profil } = ProfilHooks();
  const { data: balance } = BalanceHooks();
  const { data: topup, method } = TopupHooks();
  const [togel, setTogel] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    method.handleSubmit();
  };
  return (
    <>
      <div className="flex flex-col w-full items-center h-full p-8 ">
        <div className="w-full max-w-6xl">
          <div className="flex justify-between">
            <div className="flex flex-col items-center">
              <img
                src={
                  profil?.payload?.profile_image || "https://bit.ly/dan-abramov"
                }
                alt={profil?.payload?.last_name}
                className="rounded-full h-16 w-16 mb-4"
              />
              <h1 className="text-xl font-bold mb-2">Selamat datang,</h1>
              <h2 className="text-2xl font-bold text-gray-800">
                {profil?.payload?.last_name}
              </h2>
            </div>
            <div className="bg-red-500 text-white w-1/2 rounded-lg p-4 mt-6 mb-4 ">
              <p className="text-lg">Saldo anda</p>
              <p className="text-3xl font-bold">
                {" "}
                {togel
                  ? ` ${formatRupiah(balance.balance.balance)}`
                  : "Rp . . . ."}
              </p>
              <p
                className="text-sm mt-4 cursor-pointer"
                onClick={() => setTogel(!togel)}
              >
                {togel ? "Tutup Saldo 👁" : " Lihat Saldo 👀"}
              </p>
            </div>
          </div>
          <div className="mb-4 mt-8">
            <p className="text-left">Silahkan masukan</p>
            <h3 className="text-lg font-bold mb-4 text-left">Nominal Top Up</h3>
          </div>
          <div>
            <input
              type="text"
              placeholder="masukan nominal Top Up"
              value={topup.customAmount}
              onChange={method.handleInputChange}
              className="w-full px-4 py-2 border rounded-lg mb-4"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {["10000", "20000", "50000", "100000", "250000", "500000"].map(
                (amount) => (
                  <button
                    type="button"
                    key={amount}
                    onClick={() => method.handleAmountClick(amount)}
                    className={`px-4 py-2 ${
                      topup.selectedAmount === amount
                        ? "bg-gray-400"
                        : "bg-gray-200"
                    } hover:bg-gray-300 rounded-lg`}
                  >
                    {amount}
                  </button>
                )
              )}
            </div>
            <button
              type="button"
              onClick={handleOpenModal}
              className="w-full mt-4 cursor-pointer py-2 bg-gray-300 hover:bg-gray-400 text-center rounded-lg"
            >
              Top Up
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Apakah anda ingin melanjutkan transaksi ini?"
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default HomePageTopup;
