import create from 'zustand';

export type APIStore = {
  accessToken?: string;
};

export const useAPIStore = create<APIStore>((set, get) => ({}));
