import React from 'react';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Avatar,
  Text,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavLink: React.FC<{ children: React.ReactNode; to: string }> = ({ children, to }) => (
  <RouterLink to={to}>
    <Box
      px={2}
      py={1}
      rounded={'md'}
      _hover={{
        textDecoration: 'none',
        bg: useColorModeValue('gray.200', 'gray.700'),
      }}>
      {children}
    </Box>
  </RouterLink>
);

export default function Navigation() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/auth');
  };

  return (
    <Box bg={useColorModeValue('white', 'gray.900')} px={4} boxShadow={'sm'}>
      <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
        <IconButton
          size={'md'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />

        <HStack spacing={8} alignItems={'center'}>
          <Box>
            <Text fontSize="lg" fontWeight="bold" color="brand.600">
              Systems Lab
            </Text>
          </Box>
          <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
            <NavLink to="/challenges">Challenges</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </HStack>
        </HStack>

        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}>
              <Avatar
                size={'sm'}
                src={user?.avatar}
                name={user?.name}
              />
            </MenuButton>
            <MenuList>
              <MenuItem>
                <Text fontSize="sm" fontWeight="medium">
                  {user?.name}
                </Text>
              </MenuItem>
              <MenuItem>
                <Text fontSize="sm" color="gray.500">
                  {user?.email}
                </Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem onClick={() => navigate('/profile')}>
                Profile Settings
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as={'nav'} spacing={4}>
            <NavLink to="/challenges">Challenges</NavLink>
            <NavLink to="/profile">Profile</NavLink>
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
} 