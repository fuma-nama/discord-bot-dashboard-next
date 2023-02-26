import { Textarea, TextareaProps } from '@chakra-ui/react';
import { FormComponentProps, FormControlCard } from './Form';

export type TextAreaFormProps = FormComponentProps<{
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  input?: TextareaProps;
}>;

export function TextAreaForm({ value, onChange, placeholder, input, ...form }: TextAreaFormProps) {
  return (
    <FormControlCard {...form}>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        variant="glass"
        {...input}
      />
    </FormControlCard>
  );
}
