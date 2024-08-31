import { getService } from "@/store/slice/service";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ServiceHooks = () => {
  const dispatch = useDispatch();
  const { service, error } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(getService());
  }, [dispatch]);

  return {
    data: {
      service,
      error,
    },
    method: {},
  };
};

export default ServiceHooks;
