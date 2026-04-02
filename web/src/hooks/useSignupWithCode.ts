import AccountsClient from "@/services/accounts-client";
import { useMutation } from "@tanstack/react-query";
import { toaster } from "@/components/ui/toaster";
import getErrorMessage from "@/utils/get-error-message";

const accountsClient = new AccountsClient();

const useSignupWithCode = () => {
  const sendCodeMutation = useMutation({
    mutationFn: accountsClient.sendSignupCode,
    onSuccess: () => {      
        toaster.create({
            title: "Verification code sent",
            description: "Please check your email for the verification code.",
            type: "success",
            duration: 3000,
            closable: true,
        });
    },
    onError: (error) => {
        toaster.create({
            title: "Could not send code",
            description: getErrorMessage(error),
            type: "error",
            duration: 3000,
            closable: true,
        });
    }
  });

  const verifyCodeMutation = useMutation({
    mutationFn: accountsClient.verifySignupCode,
    onSuccess: () => {      
        toaster.create({
            title: "Account created",
            description: "Your account has been created successfully.",
            type: "success",
            duration: 3000,
            closable: true,
        });
    },
    onError: (error) => {
        toaster.create({
            title: "Verification failed",
            description: getErrorMessage(error),
            type: "error",
            duration: 3000,
            closable: true,
        });
    }
  });

  return {
    sendCode: sendCodeMutation.mutateAsync,
    verifyCode: verifyCodeMutation.mutateAsync,
    
    sendCodeData: sendCodeMutation.data,
    verifyCodeData: verifyCodeMutation.data,

    sendCodeError: sendCodeMutation.error,
    verifyCodeError: verifyCodeMutation.error,

    isSendingCode: sendCodeMutation.isPending,
    isVerifyingCode: verifyCodeMutation.isPending,
  };
}

export default useSignupWithCode;
