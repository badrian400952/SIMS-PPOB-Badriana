import { getBanner } from "@/store/slice/banner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import image from "../assets/PBB.png";
const BannerHooks = () => {
  const dispatch = useDispatch();
  const { banner, error } = useSelector((state) => state.banner);

  useEffect(() => {
    dispatch(getBanner());
  }, [dispatch]);

  const handleImageErrorProfile = (event) => {
    event.target.src =
      "https://e7.pngegg.com/pngimages/16/260/png-clipart-robert-rinder-kuijpers-nillesen-advocaten-criminal-defense-lawyer-business-lawyer-people-university.png";
  };

  const handleImageErrorProduct = (event) => {
    event.target.src = image;
  };

  return {
    data: {
      banner,
      error,
    },
    method: {
      handleImageErrorProfile,
      handleImageErrorProduct,
    },
  };
};

export default BannerHooks;
