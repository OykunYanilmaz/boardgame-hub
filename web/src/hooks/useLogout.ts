import AuthClient from '@/services/auth-client';
import { useQueryClient } from '@tanstack/react-query';

const authClient = new AuthClient();

const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    authClient.logout();
    queryClient.setQueryData(['me'], null);
  };
};

export default useLogout;
