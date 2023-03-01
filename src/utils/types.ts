export type Override<T, R> = Omit<T, keyof R> & R;
