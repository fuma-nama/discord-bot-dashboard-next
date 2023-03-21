import {
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
  Spacer,
} from '@chakra-ui/react';
import { BottomCard, SidebarContent } from './SidebarContent';
import { AnimatePresence, motion } from 'framer-motion';
import { usePageStore } from '@/stores';
import { sidebarBreakpoint } from '@/theme/breakpoints';
import { ReactNode } from 'react';

export function Sidebar({ sidebar }: { sidebar?: ReactNode }) {
  return (
    <Flex
      direction="column"
      display={{ base: 'none', [sidebarBreakpoint]: 'flex' }}
      flexShrink={0}
      bg="CardBackground"
      w="300px"
      h="100%"
      overflowX="hidden"
      overflowY="auto"
    >
      <AnimatePresence exitBeforeEnter initial={false}>
        <motion.div
          key={sidebar == null ? 'default' : 'new'}
          initial={{ x: '100px', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '-100px', opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          {sidebar ?? <SidebarContent />}
        </motion.div>
      </AnimatePresence>
      <Spacer />
      <BottomCard />
    </Flex>
  );
}

export function SidebarResponsive({ sidebar }: { sidebar?: ReactNode }) {
  const [isOpen, setOpen] = usePageStore((s) => [s.sidebarIsOpen, s.setSidebarIsOpen]);

  return (
    <Drawer isOpen={isOpen} onClose={() => setOpen(false)}>
      <DrawerOverlay />
      <DrawerContent w="285px" maxW="285px" bg="CardBackground">
        <DrawerCloseButton
          zIndex="3"
          onClick={() => setOpen(false)}
          _focus={{ boxShadow: 'none' }}
          _hover={{ boxShadow: 'none' }}
        />
        <DrawerBody maxW="285px" px="0rem" pb="0">
          <Flex direction="column" height="100%" overflow="auto">
            {sidebar ?? <SidebarContent />}
            <Spacer />
            <BottomCard />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
