import BalanceHooks from "@/service/balance";
import BayarHooks from "@/service/bayar";
import ProfilHooks from "@/service/profil";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaMoneyCheck } from "react-icons/fa";
import { formatRupiah } from "@/utils/formatRupiah";
import Modal from "@/utils/modals";

const Bayar = () => {
  const location = useLocation();
  const { serviceData } = location.state || {};

  const { data: profil } = ProfilHooks();
  const { data: balance } = BalanceHooks();
  const { data: bayar, method: setBayar } = BayarHooks();
  const [togel, setTogel] = useState(false);

  useEffect(() => {
    setBayar.setPayload({ ...serviceData });
  }, [serviceData]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = () => {
    setIsModalOpen(false);
    setBayar.handleSubmit();
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
                  ? `Rp ${formatRupiah(balance.balance.balance)}`
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
            <p className="text-left font-bold">Pembayaran</p>
            <div className="flex justify-start gap-8 my-5">
              <img
                className="rounded-full w-12 h-12"
                src={serviceData.service_icon}
                alt={serviceData.service_name}
                // image response rusak
              />
              <p className="text-left font-bold">{serviceData.service_name}</p>
            </div>
          </div>
          <div>
            <div className="relative">
              <input
                disabled
                type="text"
                placeholder="masukan nominal Top Up"
                value={formatRupiah(bayar?.payload?.service_tariff)}
                className="w-full pl-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMoneyCheck />
              </div>
            </div>

            <button
              type="button"
              onClick={handleOpenModal}
              className="w-full mt-4 cursor-pointer py-2 bg-gray-300 hover:bg-gray-400 text-center rounded-lg"
            >
              Bayar
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        title="Apakah anda ingin melanjutkan pembayaran ini?"
        onClose={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </>
  );
};

export default Bayar;
