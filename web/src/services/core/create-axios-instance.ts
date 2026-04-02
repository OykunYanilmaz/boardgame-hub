import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';

const createAxiosInstance = (baseURL: string) => {
    const axiosInstance = axios.create({
        baseURL: baseURL,
    });

    axiosInstance.interceptors.request.use(config => {
    if (config.data && !(config.data instanceof FormData)) {
        config.data = decamelizeKeys(config.data, { deep: true });
    }

    if (config.params) {
        config.params = decamelizeKeys(config.params, { deep: true });
    }

    return config;
    });

    axiosInstance.interceptors.response.use(response => {
    response.data = camelcaseKeys(response.data, { deep: true });
    return response;
    });

    return axiosInstance;
}

export default createAxiosInstance;
