import { AxiosResponse } from "axios";

export interface AxiosCall<T> {
  call: Promise<AxiosResponse<T>>;
  controller?: AbortController;
}

export interface MapiResponse {
  status: boolean;
  body: any;
  error: string | null;
}
