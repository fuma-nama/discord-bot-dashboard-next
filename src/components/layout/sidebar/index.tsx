import {
  Box,
  Drawer,
  DrawerBody,
  useColorModeValue,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { BottomCard, SidebarContent } from './SidebarContent';
import { AnimatePresence, motion } from 'framer-motion';
import { SidebarItemInfo } from '@/utils/router';
import { usePageStore } from '@/stores';
import { sidebarBreakpoint } from '@/theme/breakpoints';
import { ReactNode } from 'react';

export function Sidebar({ sidebar, items }: { sidebar?: ReactNode; items: SidebarItemInfo[] }) {
  const shadow = useColorModeValue('14px 17px 40px 4px rgba(112, 144, 176, 0.08)', 'unset');
  const sidebarBg = useColorModeValue('white', 'navy.800');
  const sidebarMargins = '0px';

  return (
    <Box display={{ base: 'none', [sidebarBreakpoint]: 'block' }} minH="100%">
      <Box
        bg={sidebarBg}
        w="300px"
        h="100vh"
        m={sidebarMargins}
        minH="100%"
        overflowX="hidden"
        boxShadow={shadow}
      >
        <Flex direction="column" height="100%" overflowX="hidden" overflowY="auto">
          <AnimatePresence exitBeforeEnter initial={false}>
            <motion.div
              key={sidebar == null ? 'default' : 'new'}
              initial={{ x: '100px', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '-100px', opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {sidebar ?? <SidebarContent items={items} />}
            </motion.div>
          </AnimatePresence>
          <Spacer />
          <BottomCard />
        </Flex>
      </Box>
    </Box>
  );
}

export function SidebarResponsive({
  sidebar,
  items,
}: {
  sidebar?: ReactNode;
  items: SidebarItemInfo[];
}) {
  const sidebarBackgroundColor = useColorModeValue('white', 'navy.800');

  const [isOpen, setOpen] = usePageStore((s) => [s.sidebarIsOpen, s.setSidebarIsOpen]);

  return (
    <Drawer
      isOpen={isOpen}
      onClose={() => setOpen(false)}
      placement={document.documentElement.dir === 'rtl' ? 'right' : 'left'}
    >
      <DrawerOverlay />
      <DrawerContent w="285px" maxW="285px" bg={sidebarBackgroundColor}>
        <DrawerCloseButton
          zIndex="3"
          onClick={() => setOpen(false)}
          _focus={{ boxShadow: 'none' }}
          _hover={{ boxShadow: 'none' }}
        />
        <DrawerBody maxW="285px" px="0rem" pb="0">
          <Flex direction="column" height="100%" overflow="auto">
            {sidebar ?? <SidebarContent items={items} />}
            <Spacer />
            <BottomCard />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
