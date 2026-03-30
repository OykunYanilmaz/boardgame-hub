import AuthClient from '@/services/auth-client';
import { useQuery } from '@tanstack/react-query';

const authClient = new AuthClient();

const useMe = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: () => authClient.getMe(),
  });


export default useMe;
