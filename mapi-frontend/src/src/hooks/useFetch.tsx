import { useEffect } from "react";
import { AxiosCall } from "src/interfaces";

const useFetch = () => {
  let controller: AbortController;

  const callEndpoint = async (axiosCall: AxiosCall<any>) => {
    if (axiosCall.controller) controller = axiosCall.controller;
    let result: any = {};
    try {
      const res = await axiosCall.call;
      result = res.data;
    } catch (err: any) {
      result = err.response.data;
    } finally {
      return result;
    }
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

export default useFetch;
