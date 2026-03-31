import { toaster } from '@/components/ui/toaster';
import AuthClient from '@/services/auth-client';
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
    onError: () => {
      toaster.create({
        title: 'Password update failed',
        description: 'Please check your current password.',
        type: 'error',
        duration: 3000,
        closable: true
      })
    }
  });
};

export default useChangePassword;
