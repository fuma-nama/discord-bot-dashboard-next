import { DependencyList, memo, ReactElement } from 'react';

export function memorized<T>(
  component: (props: T) => ReactElement,
  dependencies: (props: T) => DependencyList
) {
  return memo(component, (prev, next) => {
    const prevDeps = dependencies(prev);
    const nextDeps = dependencies(next);
    const eq = (a: any, b: any): boolean => {
      if (
        Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((v, i) => eq(v, b[i]))
      )
        return true;

      return a === b;
    };

    return eq(prevDeps, nextDeps);
  });
}

export const Memoize = memorized<{
  dependencies: DependencyList;
  children: ReactElement;
}>(
  ({ children }) => {
    return children;
  },
  (p) => p.dependencies
);
