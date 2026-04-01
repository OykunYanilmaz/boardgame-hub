import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import logo from '../assets/board-games.svg'
import useLogin from '@/hooks/useLogin';
import {
  Box,
  Button,
  Input,
  VStack,
  Text,
  Image,
  HStack,
  Separator,
  Link as ChakraLink,
  Heading,
} from '@chakra-ui/react';
import { PasswordInput } from '@/components/ui/password-input';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
    },
  });

  const onSubmit = async (data: LoginData) => {
    try {
      await login.mutateAsync(data);
      reset();
      navigate('/');
    } catch {
      // toaster error message
    }
  };

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} marginTop={20}>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} width="full" maxWidth={{ base: "260px", md: "360px"}}>
        <VStack gap={3}>
          <RouterLink to={'/'}><Image src={logo} boxSize={{ base: "36px", sm: "44px", md: "52px", lg: "60px" }} objectFit={'cover'}/></RouterLink>
          <Heading marginBottom={5}>Sign in to BG-Hub</Heading>
          <Input {...register('username')} placeholder="Username" />
          {errors.username && (
            <Text color="red.600" fontSize="sm">
              {errors.username.message}
            </Text>
          )}
          <PasswordInput {...register('password')} type="password" placeholder="Password" />
          {errors.password && (
            <Text color="red.600" fontSize="sm">
              {errors.password.message}
            </Text>
          )}

          <Button
            type="submit"
            border="1px solid green"
            width="full"
            variant={'outline'}
            loading={login.isPending}
            disabled={!isValid}
          >
            Sign In
          </Button>
          <HStack width="full">
            <Separator flex="1" />
            <Text fontSize="sm" color='gray.500'>or</Text>
            <Separator flex="1" />
          </HStack>
          <Button width="full" variant="outline">
            <FaFacebookSquare size="20px" color="#1877F2" /> Continue with Facebook
          </Button>
          <Button width="full" variant="outline">
            <FcGoogle /> Continue with Google
          </Button>
          <HStack gap={3}>
            <Text fontSize="sm">New to BG-Hub?</Text>
            <ChakraLink fontSize="sm" outline='none' textDecoration="underline" asChild color="green.600">
              <RouterLink to={'/signup'}>Create an account</RouterLink>
            </ChakraLink>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default LoginPage;
