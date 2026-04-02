import createAxiosInstance from './core/create-axios-instance';

const axiosInstance = createAxiosInstance(import.meta.env.VITE_ACCOUNTS_URL);

type SendSignupCodeRequest = {
  email: string;
};

type SendSignupCodeResponse = {
  message: string;
};

type VerifySignupCodeRequest = {
  firstName?: string;
  lastName?: string;
  username: string;
  email: string;
  code: string;
  password: string;
  rePassword: string;
};

type VerifySignupCodeResponse = {
  message: string;
  userId: number;
  email: string;
  username: string;
};

class AccountsClient {
  sendSignupCode = (data: SendSignupCodeRequest) => {
    return axiosInstance.post<SendSignupCodeResponse>('/send-signup-code/', data).then(res => res.data);
  };

  verifySignupCode = (data: VerifySignupCodeRequest) => {
    return axiosInstance.post<VerifySignupCodeResponse>('/verify-signup-code/', data).then(res => res.data);
  };
}

export default AccountsClient;
