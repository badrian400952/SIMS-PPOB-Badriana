import { getProfil, getUsersEdit, putUserImage } from "@/store/slice/profil";
import useNotification from "@/utils/alert";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfilHooks = () => {
  const { notifSuccess, notifError } = useNotification();
  const dispatch = useDispatch();
  const { profil, error } = useSelector((state) => state.profil);
  const [payload, setPayload] = useState({});
  const [image, setImage] = useState(null);
  const [images, setImages] = useState(null);

  const handleTogels = (e) => {
    e.preventDefault();
    if (image) {
      handleEditimages();
    } else {
      handleEdit();
    }
  };

  useEffect(() => {
    dispatch(getProfil());
  }, [dispatch]);

  useEffect(() => {
    setPayload(profil);
  }, [profil]);

  const handleEdit = async () => {
    try {
      const ress = await dispatch(getUsersEdit(payload));
      if (ress.error) {
        notifError(
          `Gagal Melakukan Login: ${ress.error.message || "Terjadi kesalahan"}`
        );
        return;
      }
      notifSuccess(`${ress.payload.message}`);
    } catch (error) {
      notifError(` ${error.response.data.message || "Terjadi kesalahan"}`);
    }
  };

  const handleImageChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      setImages(file);
    }
  };

  const handleEditimages = async () => {
    try {
      const ress = await dispatch(putUserImage(images)).unwrap();
      if (ress.error) {
        notifError(
          `Gagal Melakukan Login: ${ress.error.message || "Terjadi kesalahan"}`
        );
        return;
      }
    } catch (error) {
      notifError(`${error || "Terjadi kesalahan"}`);
    }
  };
  return {
    data: {
      profil,
      error,
      payload,
      image,
    },
    method: {
      setPayload,
      handleEdit,
      setImage,
      handleTogels,
      handleImageChange,
    },
  };
};

export default ProfilHooks;
