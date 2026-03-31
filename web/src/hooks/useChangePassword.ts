import { toaster } from '@/components/ui/toaster';
import AuthClient from '@/services/auth-client';
import getErrorMessage from '@/utils/get-error-message';
import { useMutation } from '@tanstack/react-query';

const authClient = new AuthClient();

const useChangePassword = () => {
  return useMutation({
    mutationFn: authClient.changePassword,
    onSuccess: () => {
      toaster.create({
        title: 'Password updated',
        type: 'success',
        duration: 3000,
        closable: true,
      });
    },
    onError: (error) => {
      toaster.create({
        title: 'Password update failed',
        description: getErrorMessage(error),
        type: 'error',
        duration: 3000,
        closable: true
      })
    }
  });
};

export default useChangePassword;
