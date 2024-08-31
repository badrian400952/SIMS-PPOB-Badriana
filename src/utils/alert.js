import { useToast } from "@chakra-ui/react";

const useNotification = () => {
  const toast = useToast();

  const notifSuccess = (message) => {
    toast({
      title: "Success",
      description: message,
      status: "success",
      duration: 3000,
      position: "top",
      isClosable: true,
    });
  };

  const notifError = (message) => {
    toast({
      title: "Error",
      description: message,
      status: "error",
      duration: 5000,
      position: "top",
      isClosable: true,
    });
  };

  return { notifSuccess, notifError };
};

export default useNotification;
