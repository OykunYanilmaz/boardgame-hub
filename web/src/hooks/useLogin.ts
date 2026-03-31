import AuthClient from '@/services/auth-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';
import getErrorMessage from '@/utils/get-error-message';

const authClient = new AuthClient();

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authClient.login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['me'] }),
    onError: (error) => {
      toaster.create({
        title: 'Login failed',
        description: getErrorMessage(error),
        type: 'error',
        duration: 3000,
        closable: true,
      });
    },
  });
};

export default useLogin;
