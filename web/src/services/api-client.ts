import axios, { type AxiosRequestConfig } from "axios"
import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from "decamelize-keys";

export type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[]
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  if (config.data) {
    config.data = decamelizeKeys(config.data, { deep: true });
  }

  if (config.params) {
    config.params = decamelizeKeys(config.params, { deep: true });
  }

  return config;
});

axiosInstance.interceptors.response.use((response) => {
  response.data = camelcaseKeys(response.data, { deep: true });
  return response;
});

class APIClient<T> {
    endpoint: string;

    constructor(endpoint: string) {
        this.endpoint = endpoint;
    }

    getAllPaginated = (config?: AxiosRequestConfig) => {
        return axiosInstance
            .get<PaginatedResponse<T>>(this.endpoint, config)
            .then((res) => res.data);
    }

    getAll = (config?: AxiosRequestConfig) => {
        return axiosInstance
            .get<T[]>(this.endpoint, config)
            .then((res) => res.data);
    }

    get = (id: number | string) => {
        return axiosInstance.get<T>(this.endpoint + '/' + id).then(res => res.data)
    }
}

export default APIClient;
