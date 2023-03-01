// Chakra imports
import {
  Flex,
  FormErrorMessage,
  FormLabel,
  Switch,
  SwitchProps,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { forwardRef, ReactNode } from 'react';
import { FieldValues, Path, useController, UseControllerProps } from 'react-hook-form';
import { Form, FormComponentProps } from './Form';

export type SwitchFormProps = FormComponentProps<
  Omit<SwitchProps, 'value' | 'isChecked'> & {
    value?: boolean;
  }
>;

export function ControlledSwitchForm<
  TFieldValues extends FieldValues = FieldValues,
  TName extends Path<TFieldValues> = Path<TFieldValues>
>(
  props: SwitchFormProps & {
    controller: UseControllerProps<TFieldValues, TName>;
  }
) {
  const { field } = useController(props.controller);
  return <SwitchForm {...props} {...field} />;
}

export const SwitchForm = forwardRef<HTMLInputElement, SwitchFormProps>(
  ({ control, value, ...props }, ref) => {
    return (
      <Form {...control}>
        <Flex justify="space-between" align="center" borderRadius="16px" gap={3}>
          <FormLabel _hover={{ cursor: 'pointer' }} flexDirection="column">
            <Text fontSize={{ base: 'lg', lg: 'xl' }} fontWeight={{ base: '600', lg: 'bold' }}>
              {control.label}
            </Text>
            <Text variant="secondary">{control.description}</Text>
          </FormLabel>
          <Switch variant="main" size="md" isChecked={value} {...props} ref={ref} />
        </Flex>
        <FormErrorMessage>{control.error}</FormErrorMessage>
      </Form>
    );
  }
);

SwitchForm.displayName = 'SwitchForm';

export function SwitchField(
  props: {
    id?: string;
    label?: ReactNode;
    desc?: ReactNode;
  } & SwitchProps
) {
  const { id, label, desc, ...rest } = props;

  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  return (
    <Flex justify="space-between" align="center" borderRadius="16px" gap={3}>
      <FormLabel htmlFor={id} _hover={{ cursor: 'pointer' }} flexDirection="column">
        <Text color={textColorPrimary} fontSize="md" fontWeight="600">
          {label}
        </Text>
        <Text color="secondaryGray.600" fontSize="md">
          {desc}
        </Text>
      </FormLabel>
      <Switch id={id} variant="main" size="md" {...rest} />
    </Flex>
  );
}
