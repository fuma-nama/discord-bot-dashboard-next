import { Textarea, TextareaProps } from '@chakra-ui/react';
import { forwardRef } from 'react';
import { FormCard } from './Form';
import { WithControl } from './types';

export type TextAreaFormProps = WithControl<TextareaProps>;

export const TextAreaForm = forwardRef<HTMLTextAreaElement, TextAreaFormProps>(
  ({ control, ...input }, ref) => {
    return (
      <FormCard {...control}>
        <Textarea variant="glass" {...input} ref={ref} />
      </FormCard>
    );
  }
);

TextAreaForm.displayName = 'Textarea';
