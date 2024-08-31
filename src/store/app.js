import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slice/register";
import profilSlice from "./slice/profil"
import bannerSlice from "./slice/banner"
import serviceSlice from "./slice/service"
import balanceSlice from "./slice/balance"
import transactionSlice from "./slice/transaction"
import bayarSlice from "./slice/bayar"
export const store = configureStore({
   reducer: {
      user: userSlice,
      profil: profilSlice,
      banner: bannerSlice,
      service: serviceSlice,
      balance: balanceSlice,
      transaction: transactionSlice,
      bayar: bayarSlice
   },
 })