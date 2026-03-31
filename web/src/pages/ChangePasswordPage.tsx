import { Box, Button, Input, VStack, Text, Progress } from '@chakra-ui/react';
import { useForm, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import useChangePassword from '@/hooks/useChangePassword';
import { useNavigate } from 'react-router-dom';
import zxcvbn from 'zxcvbn';

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, { error: 'Current password is required.' }),
    newPassword: z.string().min(8, { error: 'Password must be at least 8 characters.' }),
    confirmNewPassword: z.string().min(1, { error: 'Please confirm your new password.' }),
  })
  .refine(data => data.newPassword === data.confirmNewPassword, {
    error: 'New passwords do not match.',
    path: ['confirmNewPassword'],
  })
  .refine(data => zxcvbn(data.newPassword).score >= 2, {
    error: 'Password is weak.',
    path: ['newPassword']
  });

type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

const ChangePasswordPage = () => {
  const changePassword = useChangePassword();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
  });

  const password = useWatch({
    control,
    name: 'newPassword'
  });
  const result = password ? zxcvbn(password) : null;
  const strength = result?.score ?? 0;
  const value = password ? (strength + 1) * 20 : 0;
  const labels = ['Very weak', 'Weak', 'Fair', 'Good', 'Strong'];
  const colors = ['red.500', 'orange.400', 'yellow.400', 'blue.500', 'green.500'];

  const onSubmit = async (data: ChangePasswordFormData) => {
    try {
      await changePassword.mutateAsync({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        // no need to send confirmNewPassword
      });
  
      navigate('/');
    } catch {
      // hook toaster
    }
  }

  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} marginTop={5}>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} width="full" maxWidth="360px">
        <VStack gap={3}>
          <Input {...register('currentPassword')} type="password" placeholder="Current Password" />
          {errors.currentPassword && <Text color='red.600' fontSize='sm'>{errors.currentPassword.message}</Text>}
          <Input {...register('newPassword')} type="password" placeholder="New Password" />
          {errors.newPassword && <Text color='red.600' fontSize='sm'>{errors.newPassword.message}</Text>}
          {password && (
            <Progress.Root value={value} max={100} width='100%' colorPalette='gray'>
              <Progress.Label>Password Strength:</Progress.Label>
              <Progress.Track>
                <Progress.Range bg={colors[strength]}/>
              </Progress.Track>
              <Progress.ValueText color={colors[strength]}>
                {labels[strength]}
              </Progress.ValueText>
            </Progress.Root>
          )}
          <Input {...register('confirmNewPassword')} type="password" placeholder="Confirm New Password" />
          {errors.confirmNewPassword && <Text color='red.600' fontSize='sm'>{errors.confirmNewPassword.message}</Text>}
          
          <Button type="submit" variant="outline" loading={changePassword.isPending} disabled={!isValid}>
            Change Password
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default ChangePasswordPage;
