import {
  Avatar,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { UserInfo, avatarUrl } from '@/api/discord';
import { common } from '@/config/translations/common';
import Link from 'next/link';
import { useSelfUser } from '@/api/hooks';
import { useLogoutMutation } from '@/utils/auth/hooks';

export function UserMenu(props: { color: string; shadow: string; bg: string }) {
  const user = useSelfUser();

  return (
    <Menu>
      <MenuButton p="0px">
        <Avatar
          _hover={{ cursor: 'pointer' }}
          color="white"
          name={user.username}
          src={avatarUrl(user)}
          bg="#11047A"
          w="40px"
          h="40px"
        />
      </MenuButton>
      <List user={user} shadow={props.shadow} menuBg={props.bg} textColor={props.color} />
    </Menu>
  );
}

function List(props: { textColor: string; shadow: string; menuBg: string; user: UserInfo }) {
  const t = common.useTranslations();
  const { menuBg, shadow, textColor, user } = props;
  const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
  const logout = useLogoutMutation();

  return (
    <MenuList boxShadow={shadow} p="0px" mt="10px" borderRadius="20px" bg={menuBg} border="none">
      <Flex w="100%" mb="0px">
        <Text
          ps="20px"
          pt="16px"
          pb="10px"
          w="100%"
          borderBottom="1px solid"
          borderColor={borderColor}
          fontSize="sm"
          fontWeight="700"
          color={textColor}
        >
          <span aria-label="Hi" role="img">
            👋
          </span>
          &nbsp; Hey, {user.username}
        </Text>
      </Flex>
      <Flex flexDirection="column" p="10px">
        <MenuItem
          _hover={{ bg: 'none' }}
          _focus={{ bg: 'none' }}
          borderRadius="8px"
          px="14px"
          as={Link}
          href={`/user/profile`}
        >
          <Text fontSize="sm">{t.profile}</Text>
        </MenuItem>
        <MenuItem
          _hover={{ bg: 'none' }}
          _focus={{ bg: 'none' }}
          color="red.400"
          borderRadius="8px"
          onClick={() => logout.mutate()}
          px="14px"
        >
          <Text fontSize="sm">{t.logout}</Text>
        </MenuItem>
      </Flex>
    </MenuList>
  );
}
