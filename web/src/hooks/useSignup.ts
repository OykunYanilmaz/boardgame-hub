import AuthClient from "@/services/auth-client";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";

const authClient = new AuthClient();

const useSignup = () => {

  return useMutation({
    mutationFn: authClient.signup,
    onSuccess: () => {      
        toaster.create({
            title: 'Account created',
            description: 'You can now log in.',
            type: 'success',
            duration: 3000,
            closable: true
        });
    },
    onError: () => {
        toaster.create({
            title: 'Signup failed',
            description: 'Please check your inputs.',
            type: 'error',
            duration: 3000,
            closable: true
        });
    }
  });
};

export default useSignup;
