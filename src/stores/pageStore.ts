import { createStore } from 'zustand';
import { persist } from 'zustand/middleware';

export type PageStore = {
  sidebarIsOpen: boolean;
  setSidebarIsOpen: (v: boolean) => void;
};

export type PersistStore = {
  devMode: boolean;
  setDevMode: (v: boolean) => void;
};

export const usePageStore = createStore<PageStore>((set) => ({
  sidebarIsOpen: false,
  setSidebarIsOpen: (v) => set({ sidebarIsOpen: v }),
}));

/**
 * persist settings
 */
export const useSettingsStore = createStore(
  persist<PersistStore>(
    (set) => ({
      devMode: false,
      setDevMode: (v) => set({ devMode: v }),
    }),
    {
      name: 'settings',
    }
  )
);
