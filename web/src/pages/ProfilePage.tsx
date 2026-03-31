import { MdEdit } from "react-icons/md";
import useMe from '@/hooks/useMe';
import {
  Avatar,
  Box,
  Button,
  Grid,
  GridItem,
  Heading,
  HStack,
  Input,
  Spinner,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import useUpdateProfile from "@/hooks/useUpdateProfile";
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";

const editProfileSchema = z.object({
    firstName: z.string().trim().min(1, { error: 'First name cannot be empty.' }),
    lastName: z.string().trim().min(1, { error: 'Last name cannot be empty.' }),
    avatar: z.instanceof(File).optional().nullable(),
});

type EditProfileFormData = z.infer<typeof editProfileSchema>;

const ProfilePage = () => {
  const { data: user, isLoading, error } = useMe();
  const updateProfile = useUpdateProfile();
  
  const [ isEditing, setIsEditing ] = useState(false);
  const [ previewUrl, setPreviewUrl ] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  
  const { 
    register, handleSubmit, 
    reset, setValue, 
    formState: { errors, isValid }
  } = useForm<EditProfileFormData>({ 
    resolver: zodResolver(editProfileSchema),
    mode: 'onChange',
  });


  if (isLoading) return <Spinner />;

  if (error) throw error;

  if (!user) return <Text>User not found.</Text>;


  const avatarSrc = previewUrl || user.avatar || undefined;
  const displayFallbackName =
    `${user.firstName || ''} ${user.lastName || ''}`.trim() || user.username;

  const handleSave = async (data: EditProfileFormData) => {
    const formData = new FormData();

    formData.append('first_name', data.firstName);
    formData.append('last_name', data.lastName);
    if (data.avatar) formData.append('avatar', data.avatar);

    await updateProfile.mutateAsync(formData);
    setIsEditing(false);
    setPreviewUrl(null);
  };

  return (
    <Box display={'flex'} justifyContent={'center'} marginTop={5}>
      <Grid
        templateAreas={{
          base: `"heading" 
                 "avatar" 
                 "info"`,
          lg: `"heading heading" 
               "avatar info"`,
        }}
        templateColumns={{
          base: '1fr',
          lg: '250px 250px',
        }}
        gapX={10}
      >
        <GridItem area="heading">
          <Heading size="xl" marginBottom={10} textAlign={'center'}>
            Profile
          </Heading>
        </GridItem>
        <GridItem area="avatar">
          <Avatar.Root width="240px" height="240px">
            <Avatar.Fallback name={displayFallbackName} />
            {avatarSrc && <Avatar.Image src={avatarSrc} alt={user.username} />}
          </Avatar.Root>
          {isEditing && (
            <>
              <Input ref={fileInputRef} type="file" accept="image/*" display='none' 
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  setValue('avatar', file);
                  const localPreviewUrl = URL.createObjectURL(file);
                  setPreviewUrl(localPreviewUrl);
                }}
              />
              <Button size='xs' variant='outline' onClick={() => fileInputRef.current?.click()}><MdEdit />Edit</Button>
            </>
          )}
        </GridItem>
        <GridItem area="info" marginTop={2}>
          <VStack gap={3} align="start">
            <Box>
              <Text>First Name:</Text>
              {isEditing ? (
                <>
                  <Input {...register('firstName')} />
                  {errors.firstName && <Text color='red.600' fontSize='sm'>{errors.firstName.message}</Text>}
                </>
              ) : (
                <Text color={'gray.400'}>{user.firstName || '-'}</Text>
              )}
            </Box>
            <Box>
              <Text>Last Name:</Text>
              {isEditing ? (
                <>
                  <Input {...register('lastName')} />
                  {errors.lastName && <Text color='red.600' fontSize='sm'>{errors.lastName.message}</Text>}
                </>
              ) : (
                <Text color={'gray.400'}>{user.lastName || '-'}</Text>
              )}
            </Box>
            <Box>
              <Text>Username:</Text>
              <Text color={'gray.400'}>{user.username}</Text>
            </Box>
            <Box>
              <Text>Email:</Text>
              <Text color={'gray.400'}>{user.email}</Text>
            </Box>
            <HStack width={'100%'}>
              <Button flex={1} marginTop={5} variant={'outline'}
                      border={isEditing ? '1px solid tomato' : ''}
                      onClick={() => {
                        reset({
                            firstName: user.firstName || '',
                            lastName: user.lastName || '',
                            avatar: null,
                        });
                        setPreviewUrl(null);
                        setIsEditing(prev => !prev);
                      }}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
              {isEditing && <Button flex={1} border='1px solid green' marginTop={5} variant={'outline'} 
                                    loading={updateProfile.isPending} onClick={handleSubmit(handleSave)} disabled={!isValid}>Save</Button>}
            </HStack>
            <Button width={'100%'} variant={'outline'} onClick={() => navigate('/change-password')}>Change Password</Button>
          </VStack>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default ProfilePage;
