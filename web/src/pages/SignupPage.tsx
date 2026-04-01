import { Box, Button, Input, VStack, Text, Flex, HStack, Link as ChakraLink, Heading, Separator } from '@chakra-ui/react';
import { PasswordInput } from "@/components/ui/password-input"
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useSignup from '@/hooks/useSignup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import signupImage from '../assets/signup-image.webp';
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

const signupSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    // age: z.number().min(10, { error: 'Age must be at least 10.' }).max(100, { error: 'Age must be 100 or less.' }).optional(),
    username: z.string().min(3, { error: 'Username must be at least 3 characters.' }),
    email: z.string().pipe(z.email({ error: 'Enter a valid email address.' })),
    password: z.string().min(8, { error: 'Password must be at least 8 characters.' }),
    rePassword: z.string().min(1, { error: 'Please confirm your password.' }),
  })
  .refine(data => data.password === data.rePassword, {
    error: 'Passwords do not match.',
    path: ['rePassword'],
  })
  .refine(data => data.password.toLowerCase() !== data.username.toLowerCase(), {
    error: 'Password cannot be the same as username.',
    path: ['password'],
  });

type SignupFormData = z.infer<typeof signupSchema>;

const SignupPage = () => {
  const signup = useSignup();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      //   age: '',
      username: '',
      email: '',
      password: '',
      rePassword: '',
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signup.mutateAsync(data);
      reset();
      navigate('/login');
    } catch {
      // toaster error message
    }
  };

  return (
    // <Box display={'flex'} alignItems={'center'} justifyContent={'center'} marginTop={5}>
    <Flex minH="100dvh">
      <Flex flex={{ base: "1", lg: "0.8"}} justify="center">
      <Box as="form" onSubmit={handleSubmit(onSubmit)} width="full" maxWidth={{ base: "260px", md: "360px"}} marginTop={10}>
        <VStack gap={3}>
          <Heading>Sign up for Bg-Hub</Heading>
          <Button width="full" variant="outline">
            <FaFacebookSquare size="20px" color="#1877F2" /> Continue with Facebook
          </Button>
          <Button width="full" variant="outline">
            <FcGoogle /> Continue with Google
          </Button>
          <HStack width="full">
            <Separator flex="1" />
            <Text fontSize="sm" color='gray.500'>or</Text>
            <Separator flex="1" />
          </HStack>
          <Input {...register('firstName')} placeholder="First Name (optional)" />
          <Input {...register('lastName')} placeholder="Last Name (optional)" />
          {/* <Input {...register('age', { valueAsNumber: true, setValueAs: (v) => (v === '' ? undefined : Number(v)) })} 
                 type='number' min={10} max={100} placeholder='Age' /> */}

          <Input {...register('username')} placeholder="Username *" />
          {errors.username && (
            <Text color="red.600" fontSize="sm">
              {errors.username.message}
            </Text>
          )}
          <Input {...register('email')} placeholder="Email *" />
          {errors.email && (
            <Text color="red.600" fontSize="sm">
              {errors.email.message}
            </Text>
          )}
          <PasswordInput type="password" placeholder="Password *" {...register('password')} />
          {errors.password && (
            <Text color="red.600" fontSize="sm">
              {errors.password.message}
            </Text>
          )}
          <PasswordInput type="password" placeholder="Confirm Password *" {...register('rePassword')} />
          {errors.rePassword && (
            <Text color="red.600" fontSize="sm">
              {errors.rePassword.message}
            </Text>
          )}

          <Button
            type="submit"
            variant="outline"
            border="1px solid green"
            width="full"
            loading={isSubmitting || signup.isPending}
            disabled={!isValid}
          >
            Sign Up
          </Button>
          <HStack marginTop={5} display='flex' justifyContent='space-between'>
            <Text fontSize='sm'>Already have an account?</Text>
            <ChakraLink fontSize="sm" outline='none' textDecoration="underline" asChild color="green.600">
              <RouterLink to={'/login'}> Sign in</RouterLink>
            </ChakraLink>
          </HStack>
        </VStack>
      </Box>
      </Flex>
      <Box flex={{ base: "1", lg: "1.2"}} display={{ base: 'none', lg: 'block' }} position='relative'
           bgImage={`url(${signupImage})`} bgSize='cover' bgPos='left center' bgRepeat='no-repeat'>
        <Box position='absolute' top='50px' left="125px" color='white' maxW="500px">
          <Text fontFamily='fangsong' fontSize='2xl' fontWeight='bold' fontStyle='italic' lineHeight='1.2'
                textShadow="0 0 8px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.3)">Discover your next favorite game !</Text>
        </Box>
        <Box position='absolute' top='125px' left="400px" color='white' maxW="500px">
          <Text fontFamily='fangsong' fontSize='2xl' fontWeight='bold' fontStyle='italic' lineHeight='1.2'
                textShadow="0 0 8px rgba(255,255,255,0.6), 0 0 20px rgba(255,255,255,0.3)">Play. Track. Share.</Text>
        </Box>
      </Box>
    </Flex>
  );
};

export default SignupPage;
