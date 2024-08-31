import { getBalance } from "@/store/slice/balance"
import { useEffect,  } from "react"
import { useDispatch, useSelector } from "react-redux"

const BalanceHooks = () => {
    const dispatch = useDispatch()
    const {  balance, error } = useSelector((state) => state.balance)

    useEffect(() => {
        dispatch(getBalance())
    }, [dispatch])

  return {
    data : {
      balance,
      error,
    },
    method: {
       
    }
  }
}

export default BalanceHooks
