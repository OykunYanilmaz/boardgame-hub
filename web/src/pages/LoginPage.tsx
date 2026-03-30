import useLogin from '@/hooks/useLogin';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  username: z.string().min(3, { error: 'Username must be at least 3 characters.' }),
  password: z.string().min(8, { error: 'Password must be at least 8 characters.' }),
});

type LoginData = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const login = useLogin();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      password: '',
    }
  });

  const onSubmit = async (data: LoginData) => {
    try {
      await login.mutateAsync(data);
      reset();
      navigate('/');
    } catch {
      // toaster
    }
  };

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} marginTop={5}>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} width="full" maxWidth="360px">
        <VStack gap={3}>
          <Input {...register('username')} placeholder="Username" />
          {errors.username && <Text color='red.600' fontSize='sm'>{errors.username.message}</Text>}
          <Input {...register('password')} type="password" placeholder="Password" />
          {errors.password && <Text color='red.600' fontSize='sm'>{errors.password.message}</Text>}

          <Button type="submit" variant={'outline'} loading={login.isPending} disabled={!isValid}>
            Sign In
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginPage;
