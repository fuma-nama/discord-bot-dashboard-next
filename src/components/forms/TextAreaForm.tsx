import { Textarea, TextareaProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FormComponentProps, FormControlCard } from './Form';

export type TextAreaFormProps = FormComponentProps<TextareaProps>;

export const TextAreaForm = forwardRef<HTMLTextAreaElement, TextAreaFormProps>(
  ({ control, ...input }, ref) => {
    return (
      <FormControlCard {...control}>
        <Textarea variant="glass" {...input} ref={ref} />
      </FormControlCard>
    );
  }
);

TextAreaForm.displayName = 'Textarea';
