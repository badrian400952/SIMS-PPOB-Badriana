import BalanceHooks from "@/service/balance";
import ProfilHooks from "@/service/profil";
import TransactionHooks from "@/service/transaction";
import { formatDate } from "@/utils/formatDate";
import { formatRupiah } from "@/utils/formatRupiah";
import { useState } from "react";

const Transacion = () => {
  const { data: profil } = ProfilHooks();
  const { data: transaction, method } = TransactionHooks();
  const { data: balance } = BalanceHooks();
  const [togel, setTogel] = useState(false);

  return (
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
                ? `${formatRupiah(balance.balance.balance)}`
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
          <p className="text-left font-bold">Semua Transaksi</p>
        </div>
        {transaction?.transaction?.records?.map((item, index) => {
          return (
            <div
              key={index}
              className="w-full mb-5 bg-slate-100 flex justify-between border rounded-xl"
            >
              {item.transaction_type === "TOPUP" ? (
                <>
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-lime-500">
                      + Rp {item.total_amount}
                    </h2>
                    <p className="text-[10px] text-gray-500">
                      {formatDate(item.created_on)}
                    </p>
                  </div>
                  <div className="p-4">
                    <p>{item.transaction_type}</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4">
                    <h2 className="text-lg font-bold text-red-500">
                      - Rp {item.total_amount}
                    </h2>
                    <p className="text-[10px] text-gray-500">
                      {formatDate(item.created_on)}
                    </p>
                  </div>
                  <div className="p-4">
                    <p>{item.transaction_type}</p>
                  </div>
                </>
              )}
            </div>
          );
        })}

        <div className="flex justify-center mt-10">
          <button
            onClick={method.handleRecord}
            type="submit"
            className="w-[30%] align-center bg-red-500 text-white py-2 px-4 rounded-md"
          >
            Show More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Transacion;
