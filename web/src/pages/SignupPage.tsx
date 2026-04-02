import { Box, Button, Input, VStack, Text, Flex, HStack, Link as ChakraLink, Heading, Separator, PinInput, Field, Stack } from '@chakra-ui/react';
import { PasswordInput, PasswordStrengthMeter } from "@/components/ui/password-input"
import { passwordStrength, type Options } from 'check-password-strength'
import { useForm, Controller, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import signupImage from '../assets/signup-image.webp';
import { FaFacebookSquare } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { useState } from 'react';
import useSignupWithCode from '@/hooks/useSignupWithCode';
import useLogin from '@/hooks/useLogin';

const signupSchema = z
  .object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    // age: z.number().min(10, { error: 'Age must be at least 10.' }).max(100, { error: 'Age must be 100 or less.' }).optional(),
    username: z.string().min(3, { error: 'Username must be at least 3 characters.' }),
    email: z.string().pipe(z.email({ error: 'Enter a valid email address.' })),
    password: z.string().min(8, { error: 'Password must be at least 8 characters.' }),
    rePassword: z.string().min(1, { error: 'Please confirm your password.' }),
    code: z.string().length(6, { error: 'Verification code must be 6 digits.' })
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

const strengthOptions: Options<string> = [
  { id: 1, value: 'weak', minDiversity: 0, minLength: 0 },
  { id: 2, value: 'medium', minDiversity: 2, minLength: 6 },
  { id: 3, value: 'strong', minDiversity: 3, minLength: 8 },
  { id: 4, value: 'very-strong', minDiversity: 4, minLength: 10 },
]

const SignupPage = () => {
  // const signup = useSignup();
  const navigate = useNavigate();

  const login = useLogin();
  const { sendCode, verifyCode, isSendingCode, isVerifyingCode } = useSignupWithCode();
  
  const [ showPinCodeInput, setShowPinCodeInput ] = useState(false);

  const [ resendCooldown, setResendCooldown ] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    control,
    getValues,
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
      code: '',
    },
  });

  const password = useWatch({
    control,
    name: 'password',
    defaultValue: '',
  });

  const strength = password ? passwordStrength(password, strengthOptions).id : 0;

  // const username = useWatch({
  //   control,
  //   name: 'username',
  //   defaultValue: '',
  // });

  // useEffect(() => {
  //   if (!password) return;

  //   trigger('password');
  // }, [username, password, trigger]);

  const startResendCooldown = (seconds: number) => {
    setResendCooldown(seconds);

    const interval = setInterval(() => {
      setResendCooldown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;      
        }

        return prev - 1;
      })
    }, 1000);
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;

    try {
      await sendCode({
        email: getValues('email'),
      });

      startResendCooldown(60);
    } catch {
      // toaster hook içinde
    }
  }

  // create user with djoser: auth/users/ 
  // const onSubmit = async (data: SignupFormData) => {
  //   try {
  //     await signup.mutateAsync(data);
  //     reset();
  //     navigate('/login');
  //   } catch {
  //     // toaster error message
  //   }
  // };
  const onSubmit = async (data: SignupFormData) => {
    try {
      await verifyCode({
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        username: data.username,
        email: data.email,
        password: data.password,
        rePassword: data.rePassword,
        code: data.code,
      });

      await login.mutateAsync({
        username: data.username,
        password: data.password,
      });
      
      reset();
      setShowPinCodeInput(false);
      setResendCooldown(0);
      navigate('/');
    } catch {
      // toaster error message
    }
  };
  
  const handleSignupClick = async () => {
    if (!showPinCodeInput) {
      try {
        await sendCode({
          email: getValues('email'),
        });

        setShowPinCodeInput(true);
        startResendCooldown(60);
        return;
      } catch {
        // toaster hook içinde
        return;
      }
    }

    handleSubmit(onSubmit)();
  }

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

          <Stack width={'full'} gap={3}>
            <PasswordInput type="password" placeholder="Password *" {...register('password')} />
            {errors.password && (
              <Text color="red.600" fontSize="sm">
                {errors.password.message}
              </Text>
            )} 
            <PasswordStrengthMeter value={strength}/>  
          </Stack>

          <PasswordInput type="password" placeholder="Confirm Password *" {...register('rePassword')} />
          {errors.rePassword && (
            <Text color="red.600" fontSize="sm">
              {errors.rePassword.message}
            </Text>
          )}

          {showPinCodeInput &&
            <Box width='full' marginY={2}>
              <Field.Root alignItems='center'>
                <Field.Label fontSize='xs' color='gray.500'>
                  Enter the 6-digit verification code sent to your email.
                </Field.Label>

                <Controller name='code' control={control} 
                            render={({ field }) => (
                              <PinInput.Root otp type='numeric' count={6} size='xl'
                                             value={field.value ? field.value.split('') : []}
                                             onValueChange={details => field.onChange(details.value.join(''))}
                              >
                                <PinInput.HiddenInput />
                                <PinInput.Control>
                                  <PinInput.Input index={0} />
                                  <PinInput.Input index={1} />
                                  <PinInput.Input index={2} />
                                  <PinInput.Input index={3} />
                                  <PinInput.Input index={4} />
                                  <PinInput.Input index={5} />
                                </PinInput.Control>
                              </PinInput.Root>
                            )}
                />

                {errors.code && <Text color="red.600" fontSize="sm" marginTop={2}>{errors.code.message}</Text>}
                <Button type='button' variant='plain' size='xs' _hover={{ color: 'tomato' }}
                        disabled={resendCooldown > 0 || isSendingCode} onClick={handleResendCode}>
                  {isSendingCode
                    ? 'Sending...'
                    : resendCooldown > 0
                      ? `Resend code in ${resendCooldown}s`
                      : 'Resend Code'}
                </Button>
              </Field.Root>
            </Box>
          }

          <Button
            type="button"
            variant="outline"
            border="1px solid green"
            width="full"
            loading={isSubmitting || isSendingCode || isVerifyingCode || login.isPending}
            disabled={showPinCodeInput ? !isValid : false}
            onClick={handleSignupClick}
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
