import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Flex, Spacer, Text } from '@chakra-ui/layout';
import { ReactNode } from 'react';
import {
  Controller,
  ControllerProps,
  FieldValues,
  Path,
  UseControllerProps,
} from 'react-hook-form';

export function Form(props: FormControlProps) {
  return (
    <FormControl
      as={Flex}
      direction="column"
      bg="CardBackground"
      rounded="3xl"
      p={5}
      boxShadow="normal"
      {...props}
    >
      {props.children}
    </FormControl>
  );
}

export type FormCardProps = {
  required?: boolean;
  baseControl?: FormControlProps;
  /**
   * Show an error message if not null
   */
  error?: string;
  label?: string | ReactNode;
  description?: string | ReactNode;

  children: ReactNode;
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
      <FormLabel fontSize={{ base: '16px', md: 'lg' }} fontWeight="medium" mb={0}>
        {label}
      </FormLabel>
      <Text fontSize={{ base: 'sm', md: 'md' }} color="TextSecondary">
        {description}
      </Text>
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
