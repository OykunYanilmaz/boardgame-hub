import axios, { type AxiosRequestConfig } from "axios"
import camelcaseKeys from 'camelcase-keys';

export type PaginatedResponse<T> = {
    count: number;
    next: string | null;
    previous: string | null;
    results: T[]
}

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
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
}

export default APIClient;
