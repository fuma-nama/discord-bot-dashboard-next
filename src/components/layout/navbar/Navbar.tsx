// Chakra Imports
import {
  Breadcrumb,
  BreadcrumbItem,
  Flex,
  FlexProps,
  Icon,
  SkeletonText,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useActiveSidebarItem } from '@/utils/routeUtils';
import { NavbarDefaultItems, NavbarLinksBox } from './NavbarItems';
import { IoHome } from 'react-icons/io5';
import { FaChevronRight as ChevronRightIcon } from 'react-icons/fa';
import { show, useColorsExtend } from '@/theme';
import { common } from '@/config/translations/common';
import Link from 'next/link';

export function DefaultNavbar({ children }: { children?: ReactNode }) {
  const activeItem = useActiveSidebarItem();
  const { textColorPrimary, linkColor } = useColorsExtend(
    {
      linkColor: 'brand.400',
    },
    {
      linkColor: 'cyan.200',
    }
  );

  const breadcrumb = [
    {
      icon: (<IoHome />) as ReactNode,
      text: (<common.T text="pages" />) as ReactNode,
      href: '/user/home',
    },
  ];

  if (activeItem != null)
    breadcrumb.push({
      icon: activeItem.icon,
      text: <>{activeItem.name}</>,
      href: activeItem.path,
    });

  return (
    <NavbarBox>
      <Flex
        direction="column"
        gap={{
          base: 2,
          [show.navbar]: 3,
        }}
        mt={{
          base: '8px',
          [show.navbar]: '0',
        }}
      >
        <Breadcrumb
          fontSize="sm"
          separator={<Icon verticalAlign="middle" as={ChevronRightIcon} color={linkColor} />}
        >
          {breadcrumb.map((item, i) => (
            <BreadcrumbItem key={i}>
              <Tag
                as={Link}
                href={item.href}
                gap={1}
                rounded="full"
                colorScheme="brand"
                color={linkColor}
              >
                {item.icon}
                <Text>{item.text}</Text>
              </Tag>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
        <Text
          color={textColorPrimary}
          fontWeight="bold"
          fontSize={{ base: '25px', '3sm': '34px' }}
          mb={2}
        >
          {activeItem?.name || <SkeletonText w="full" noOfLines={2} />}
        </Text>
      </Flex>
      {children ?? (
        <NavbarLinksBox>
          <NavbarDefaultItems />
        </NavbarLinksBox>
      )}
    </NavbarBox>
  );
}

export function NavbarBox({ bar, children }: { bar?: FlexProps; children: ReactNode }) {
  const navbarBackdrop = 'blur(20px)';
  const navbarBg = useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(8, 8, 28, 0.5)');

  return (
    <Flex
      direction="row"
      mx="auto"
      bg={navbarBg}
      backdropFilter={navbarBackdrop}
      borderRadius={{ [show.navbar]: '16px' }}
      lineHeight="25.6px"
      pl={{
        base: '15px',
        [show.navbar]: '10px',
      }}
      pr={{
        base: '5px',
        [show.navbar]: '10px',
      }}
      py={{ base: '3px', [show.navbar]: '8px' }}
      gap={2}
      justify="space-between"
      alignItems="stretch"
      {...bar}
    >
      {children}
    </Flex>
  );
}
