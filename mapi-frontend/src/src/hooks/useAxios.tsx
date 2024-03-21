import { useEffect } from "react";
import { AxiosResponse } from "axios";
import { AxiosCall } from "src/interfaces";
import { Alerts, CustomStorage } from "src/lib";

const useAxios = () => {
  let controller: AbortController;

  const callEndpoint = async (axiosCall: AxiosCall<any>) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    let result = {} as AxiosResponse<any>;
    try {
      result = await axiosCall.call;
    } catch (error: any) {
      if (![401, 403].includes(error.response.status)) {
        const { data } = error.response;
        Alerts.showToast("error", data.error);
      } else {
        CustomStorage.token = "";
        CustomStorage.removeToken();
      }
      return null;
    }
    return result;
  };

  const cancelEndpoint = () => {
    controller && controller.abort();
  };

  useEffect(() => {
    return () => {
      cancelEndpoint();
    };
  }, []);

  return { callEndpoint };
};

export default useAxios;
