import type { Override } from '@/utils/types';
import type { ReactElement } from 'react';
import type { FieldValues, Path, UseControllerProps, FieldPathByValue } from 'react-hook-form';
import type { FormCardProps } from './Form';

type ControlledInputProps<
  T,
  TFieldValue extends FieldValues,
  TName extends Path<TFieldValue>
> = Override<
  T,
  {
    control: Omit<FormCardProps, 'error' | 'children'>;
    controller: UseControllerProps<TFieldValue, TName>;
  }
>;

export type ControlledInput<Props, V = unknown> = <
  TFieldValues extends FieldValues,
  TName extends FieldPathByValue<TFieldValues, V>
>(
  props: ControlledInputProps<Props, TFieldValues, TName>
) => ReactElement;

export type WithControl<T> = T & {
  control: Omit<FormCardProps, 'children'>;
};
