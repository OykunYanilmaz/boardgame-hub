import useMe from "@/hooks/useMe"
import { Center, Spinner } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { data: user, isLoading } = useMe();

  if (isLoading) {
    return (
        <Center minH='60vh'>
            <Spinner />
        </Center>
    );
  }

  if (!user) return <Navigate to={'/login'} replace />

  return <Outlet />
}

export default ProtectedRoute;
