import AuthClient from '@/services/auth-client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toaster } from '@/components/ui/toaster';

const authClient = new AuthClient();

const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authClient.login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['me'] }),
    onError: () => {
      toaster.create({
        title: 'Login failed',
        description: 'Please check your username or password.',
        type: 'error',
        duration: 3000,
        closable: true,
      });
    },
  });
};

export default useLogin;
