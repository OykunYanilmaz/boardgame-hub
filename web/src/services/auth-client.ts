import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import decamelizeKeys from 'decamelize-keys';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_AUTH_URL,
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

const REFRESH_TOKEN_KEY = 'refresh_token';
const ACCESS_TOKEN_KEY = 'access_token';

type JwtResponse = {
  refresh: string;
  access: string;
};

type UserResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
};

type LoginRequest = {
  username: string;
  password: string;
};

type SignupRequest = {
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  password: string;
  rePassword: string;
};

class AuthClient {
  login = async (data: LoginRequest): Promise<JwtResponse> => {
    const response = await axiosInstance
      .post<JwtResponse>('/jwt/create/', data)
      .then(res => res.data);

    localStorage.setItem(REFRESH_TOKEN_KEY, response.refresh);
    localStorage.setItem(ACCESS_TOKEN_KEY, response.access);

    return response;
  };

  logout = (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  };

  getMe = async (): Promise<UserResponse | null> => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    if (!accessToken) return null;

    try {
      const response = await axiosInstance.get<UserResponse>('/users/me/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      return null;
    }
  };

  updateMe = async (formData: FormData): Promise<UserResponse> => {
    const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);

    const response = await axiosInstance.patch<UserResponse>('/users/me/', formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data;
  };

  signup = async (data: SignupRequest): Promise<UserResponse> => {
    const response = await axiosInstance.post<UserResponse>('/users/', data);
    return response.data;
  };
}

export default AuthClient;
