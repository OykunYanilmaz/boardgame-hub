import AuthClient from "@/services/auth-client";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toaster } from "@/components/ui/toaster";
import getErrorMessage from "@/utils/get-error-message";

const authClient = new AuthClient();

const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authClient.updateMe,
    onSuccess: () => {     
        queryClient.invalidateQueries({ queryKey: ['me'] });

        toaster.create({
            title: 'Profile updated',
            type: 'success',
            duration: 3000,
            closable: true
        });
    },
    onError: (error) => {
        toaster.create({
            title: 'Update failed',
            description: getErrorMessage(error),
            type: 'error',
            duration: 3000,
            closable: true
        });
    }
  })
}

export default useUpdateProfile
