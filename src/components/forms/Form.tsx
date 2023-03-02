import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Flex, Spacer, Text } from '@chakra-ui/layout';
import { ReactElement, ReactNode } from 'react';
import { useColors } from '@/theme';
import { FieldPathByValue, FieldValues, Path, UseControllerProps } from 'react-hook-form';
import { Override } from '@/utils/types';

export type FormProps = {
  required?: boolean;
  baseControl?: FormControlProps;
  /**
   * Show an error message if not null
   */
  error?: string;
  children: ReactNode;
};

export type FormControlCardProps = FormProps & {
  label?: string | ReactNode;
  description?: string | ReactNode;
};

export type FormComponentProps<T> = T & {
  control: Omit<FormControlCardProps, 'children'>;
};

export type ControlledInputProps<
  T,
  TFieldValue extends FieldValues = FieldValues,
  TName extends Path<TFieldValue> = Path<TFieldValue>
> = Override<
  T,
  {
    control: {
      label?: string | ReactNode;
      description?: string | ReactNode;
      required?: boolean;
      baseControl?: FormControlProps;
    };
    controller: UseControllerProps<TFieldValue, TName>;
  }
>;

export type ControlledInput<Props, V = unknown> = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPathByValue<TFieldValues, V | undefined | null> = FieldPathByValue<
    TFieldValues,
    V | undefined | null
  >
>(
  props: ControlledInputProps<Props, TFieldValues, TName>
) => ReactElement;

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

export function FormControlCard({
  label,
  description,
  required,
  baseControl,
  children,
  error,
}: FormControlCardProps) {
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
