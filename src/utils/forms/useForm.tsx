import { UseFormProps } from 'react-hook-form';
import { z, ZodType } from 'zod';

export type FormErrors<V> = {
  [K in keyof V]?: string;
};

export type UseFormOptions<V extends ZodType> = {
  schema: V;

  form: UseFormProps<z.infer<V>, any>;

  /**
   * If defined a default value, combine the current value with default values
   */
  defaultValue: V;

  /**
   * Convert value to json/form body used for http request
   */
  serializer?: 'json' | 'form' | ((v: V) => FormData | string);
};
