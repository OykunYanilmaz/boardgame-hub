import useMe from '@/hooks/useMe';
import { Center, Spinner } from '@chakra-ui/react';
import { Navigate, Outlet } from 'react-router-dom';

const GuestOnlyRoute = () => {
  const { data: user, isLoading } = useMe();

  if (isLoading) {
    return (
      <Center minH="60vh">
        <Spinner />
      </Center>
    );
  }

  if (user) return <Navigate to={'/'} replace />

  return <Outlet />;
};

export default GuestOnlyRoute;
