import { Input, InputProps } from '@chakra-ui/react';
import { FormCard, FormComponentProps, FormControlCard } from './Form';

export type InputFormProps = {
  value?: string;
  onChange?: (v: string) => void;
  placeholder?: string;
  input?: InputProps;
};

export function InputForm({
  value,
  onChange,
  placeholder,
  input,
  ...props
}: FormComponentProps<InputFormProps>) {
  return (
    <FormControlCard {...props}>
      <Input
        variant="main"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        {...input}
      />
    </FormControlCard>
  );
}
