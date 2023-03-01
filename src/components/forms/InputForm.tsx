import { Input, InputProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FormComponentProps, FormControlCard } from './Form';

export type InputFormProps = FormComponentProps<InputProps>;

export const InputForm = forwardRef<HTMLInputElement, InputFormProps>(
  ({ control, ...props }, ref) => {
    return (
      <FormControlCard {...control}>
        <Input variant="main" ref={ref} {...props} />
      </FormControlCard>
    );
  }
);

InputForm.displayName = 'InputForm';
