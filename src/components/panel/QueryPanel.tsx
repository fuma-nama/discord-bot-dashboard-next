import { UseQueryResult } from '@tanstack/react-query';
import { ReactElement, ReactNode } from 'react';
import { ErrorPanel } from './ErrorPanel';

export function QueryStatus({
  query,
  error,
  loading,
  children,
}: {
  query: UseQueryResult;
  error: string;
  /**
   * element to display when loading
   */
  loading: ReactNode;
  children: ReactNode;
}) {
  if (query.isError) return <ErrorPanel retry={() => query.refetch()}>{error}</ErrorPanel>;
  if (query.isLoading) return <>{loading}</>;
  if (query.isSuccess) return <>{children}</>;

  return <></>;
}

export function QueryStatusLayout({
  watch,
  query,
  error,
  placeholder,
  loading,
  skeleton,
  children,
  container = (s) => <>{s}</>,
}: {
  watch?: any[] | null;
  query: UseQueryResult;
  error: string;
  placeholder: ReactElement;
  /**
   * element to display when loading
   */
  loading?: ReactElement;
  /**
   * element to display in container when loading
   */
  skeleton?: ReactNode;
  children: ReactNode;
  container?: (c: ReactNode) => ReactElement;
}) {
  if (watch?.length === 0) return placeholder;
  if (query.isError) return <ErrorPanel retry={() => query.refetch()}>{error}</ErrorPanel>;
  if (query.isLoading) return loading ?? container(skeleton);
  if (query.isSuccess) return container(children);

  return <></>;
}
