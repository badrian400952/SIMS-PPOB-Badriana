import { getTransaction } from "@/store/slice/transaction"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const TransactionHooks = () => {
    const dispatch = useDispatch()
    const {  transaction, error } = useSelector((state) => state.transaction)
    const [params,setParams] = useState({
        limit: 3,
        offset: 0
    })
    
    useEffect(() => {
        dispatch(getTransaction(params))
    }, [dispatch,params])

    const handleRecord = () => {
      setParams(prevParams => ({
        ...prevParams,
        limit: prevParams.limit + 3,
        offset: 0
      }));
    }
    
  return {
    data : {
        error,
        transaction,
        params
    },
    method: {
        setParams,
        handleRecord
    }
  }
}

export default TransactionHooks
