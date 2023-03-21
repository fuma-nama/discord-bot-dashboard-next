import { FaChevronLeft as ChevronLeftIcon } from 'react-icons/fa';
import { Box, Flex, Text } from '@chakra-ui/layout';
import { Avatar, Icon, IconButton, SkeletonCircle } from '@chakra-ui/react';
import { iconUrl } from '@/api/discord';
import { useGuildPreview } from '@/api/hooks';
import { motion } from 'framer-motion';
import { ReactElement } from 'react';
import { sidebarBreakpoint } from '@/theme/breakpoints';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function GuildNavbar({ back }: { back?: boolean }) {
  const { guild: selected } = useRouter().query as { guild: string };
  const { guild } = useGuildPreview(selected);

  return (
    <Flex w="full" direction="row" alignItems="center">
      <HorizontalCollapse in={back ?? false}>
        <Box
          as={Link}
          href={`/guilds/${selected}`}
          display={{ base: 'flex', [sidebarBreakpoint]: 'none' }}
          pr={3}
          py={3}
        >
          <Icon aria-label="back" as={ChevronLeftIcon} my="auto" fontSize="lg" />
        </Box>
      </HorizontalCollapse>
      {guild == null ? (
        <SkeletonCircle mr={3} />
      ) : (
        <Avatar
          name={guild?.name}
          src={iconUrl(guild)}
          display={{ base: 'none', [sidebarBreakpoint]: 'block' }}
          mr={3}
        />
      )}
      <Text
        fontWeight="600"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        w="0"
        flex={1}
        overflow="hidden"
      >
        {guild?.name}
      </Text>
    </Flex>
  );
}

function HorizontalCollapse({ in: isOpen, children }: { in: boolean; children: ReactElement }) {
  return (
    <motion.section
      animate={isOpen ? 'open' : 'collapsed'}
      exit="collapsed"
      initial="collapsed"
      variants={{
        open: { opacity: 1, width: 'auto' },
        collapsed: { opacity: 0, width: 0 },
      }}
      transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
    >
      {children}
    </motion.section>
  );
}
