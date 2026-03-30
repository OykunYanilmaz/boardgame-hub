import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useSignup from '@/hooks/useSignup';
import { useNavigate } from 'react-router-dom';

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
  .refine((data) => data.password.toLowerCase() !== data.username.toLowerCase(), {
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
        // toaster
    }
  };

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} marginTop={5}>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} width="full" maxWidth="360px">
        <VStack gap={3}>
          <Input {...register('firstName')} placeholder='First Name (optional)' />
          <Input {...register('lastName')} placeholder='Last Name (optional)' />
          {/* <Input {...register('age', { valueAsNumber: true, setValueAs: (v) => (v === '' ? undefined : Number(v)) })} 
                 type='number' min={10} max={100} placeholder='Age' /> */}

          <Input {...register('username')} placeholder='Username *' />
          {errors.username && <Text color='red.600' fontSize='sm'>{errors.username.message}</Text>}
          <Input {...register('email')} placeholder='Email *' />
          {errors.email && <Text color='red.600' fontSize='sm'>{errors.email.message}</Text>}
          <Input type="password" placeholder="Password *" {...register('password')} />
          {errors.password && <Text color='red.600' fontSize='sm'>{errors.password.message}</Text>}
          <Input type="password" placeholder="Confirm Password *" {...register('rePassword')} />
          {errors.rePassword && <Text color='red.600' fontSize='sm'>{errors.rePassword.message}</Text>}

          <Button type="submit" variant="outline" loading={isSubmitting || signup.isPending} disabled={!isValid}>
            Sign Up
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default SignupPage;
