import { Input, InputProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FormCard } from './Form';
import { WithControl } from './types';

export type InputFormProps = WithControl<InputProps>;

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ control, ...props }, ref) => {
    return (
      <FormCard {...control}>
        <Input variant="main" ref={ref} {...props} />
      </FormCard>
    );
  }
);

InputForm.displayName = 'InputForm';
