import useLogout from '@/hooks/useLogout';
import useMe from '@/hooks/useMe';
import { Avatar, Button, HStack, Menu, Portal } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const SigningGroup = () => {
  const { data: user, isLoading } = useMe();
  const logout = useLogout();

  return (
    <HStack>
      {!isLoading && !user && (
        <Link to="/login">
          <Button size="sm" variant="outline">
            Sign In
          </Button>
        </Link>
      )}
      {!isLoading && !user && (
        <Link to="/signup">
          <Button size="sm" variant="outline">
            Sign Up
          </Button>
        </Link>
      )}
      {!isLoading && user && (
        <Menu.Root positioning={{ placement: 'bottom-end' }}>
          <Menu.Trigger cursor="pointer" outline="none">
            <Avatar.Root size="sm">
              <Avatar.Fallback name={user.firstName + ' ' + user.lastName || user.username} />
            </Avatar.Root>
          </Menu.Trigger>
          <Portal>
            <Menu.Positioner>
              <Menu.Content borderRadius="15px">
                <Menu.ItemGroup>
                  <Menu.Item value="profile" cursor={'pointer'}>
                    Profile
                  </Menu.Item>
                </Menu.ItemGroup>
                <Menu.Separator />
                <Menu.ItemGroup>
                  <Menu.Item value="signout" cursor={'pointer'} onClick={logout}>
                    Sign Out
                  </Menu.Item>
                </Menu.ItemGroup>
              </Menu.Content>
            </Menu.Positioner>
          </Portal>
        </Menu.Root>
      )}
    </HStack>
  );
};

export default SigningGroup;
