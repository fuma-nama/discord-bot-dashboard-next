import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Flex, Spacer, Text } from '@chakra-ui/layout';
import { ReactNode } from 'react';
import { useColors } from '@/theme';
import {
  Controller,
  ControllerProps,
  FieldValues,
  Path,
  UseControllerProps,
} from 'react-hook-form';

export type FormProps = {
  required?: boolean;
  baseControl?: FormControlProps;
  /**
   * Show an error message if not null
   */
  error?: string;
  children: ReactNode;
};

export function Form(props: FormControlProps) {
  const { cardBg, shadow } = useColors();

  return (
    <FormControl
      as={Flex}
      direction="column"
      bg={cardBg}
      rounded="3xl"
      p={4}
      boxShadow={shadow}
      {...props}
    >
      {props.children}
    </FormControl>
  );
}

export type FormCardProps = FormProps & {
  label?: string | ReactNode;
  description?: string | ReactNode;
};

export function FormCard({
  label,
  description,
  required,
  baseControl,
  children,
  error,
}: FormCardProps) {
  return (
    <Form isRequired={required} isInvalid={error != null} {...baseControl}>
      <FormLabel
        fontSize={{ base: 'lg', lg: 'xl' }}
        fontWeight={{ base: '600', lg: 'bold' }}
        mb={0}
      >
        {label}
      </FormLabel>
      <Text color="textColorSecondary">{description}</Text>
      <Spacer mt={2} />
      {children}
      <FormErrorMessage>{error}</FormErrorMessage>
    </Form>
  );
}

export type FormCardControllerProps<
  TFieldValue extends FieldValues,
  TName extends Path<TFieldValue>
> = {
  control: Omit<FormCardProps, 'error' | 'children'>;
  controller: UseControllerProps<TFieldValue, TName>;
  render: ControllerProps<TFieldValue, TName>['render'];
};

export function FormCardController<
  TFieldValue extends FieldValues,
  TName extends Path<TFieldValue>
>({ control, controller, render }: FormCardControllerProps<TFieldValue, TName>) {
  return (
    <Controller
      {...controller}
      render={(props) => (
        <FormCard {...control} error={props.fieldState.error?.message}>
          {render(props)}
        </FormCard>
      )}
    />
  );
}
