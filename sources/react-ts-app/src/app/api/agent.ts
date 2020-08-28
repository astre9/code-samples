import axios, { AxiosResponse } from "axios";
import { IReceipt, IContext } from "../models/receipt";

axios.defaults.baseURL = "/";

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
};

const Receipts = {
  list: (): Promise<IReceipt[]> => requests.get("/receipts"),
  details: (filename: string): Promise<IContext[]> =>
    requests.get(`/receipts/details?filename=${filename}`),
  saveContexts: (filename: string, contexts: IContext[]) =>
    requests.post(`/receipts/saveContexts?filename=${filename}`, contexts),
};

export default {
  Receipts,
};
