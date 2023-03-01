import { useRouter } from 'next/router';
import items from '@/config/sidebar-items';
import { ReactNode, useMemo } from 'react';

export function useActiveSidebarItem(): SidebarItemInfo | null {
  const route = useRouter().route;

  return useMemo(() => {
    for (const item of items) {
      if (item.path === route) return item;
    }

    return null;
  }, [route]);
}

export interface SidebarItemInfo {
  name: ReactNode;
  icon?: ReactNode;
  path: string;
  hidden?: boolean;
}
