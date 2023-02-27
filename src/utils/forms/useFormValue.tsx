export function converter<V extends object>(
  base: 'json' | 'form' | ((v: V) => FormData | string)
): (v: V) => FormData | string {
  switch (base) {
    case 'json':
      return (v) => JSON.stringify(v);
    case 'form':
      return (v) => {
        const data = new FormData();
        for (const [key, value] of Object.entries(v)) {
          data.set(key, value as string | Blob);
        }

        return data;
      };
    default:
      return (v) => base(v);
  }
}
