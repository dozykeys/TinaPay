import { useMutation } from "react-query";
import { nodeAxiosInstance } from "../../utils/server/axiosUtils";

// login
const vendElectric = async (formdata: any) => {
  return nodeAxiosInstance({
    url: "/api/elect/vend",
    method: "post",
    data: formdata,
  });
};

export const useVendElectric = (onError: any, onSuccess: any) => {
  return useMutation(vendElectric, {
    onError,
    onSuccess,
  });
};
