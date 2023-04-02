// Chakra imports
import {
  Box,
  Flex,
  FormErrorMessage,
  FormLabel,
  Switch,
  SwitchProps,
  Text,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useController } from 'react-hook-form';
import { Form } from './Form';
import { ControlledInput } from './types';

export const SwitchFieldForm: ControlledInput<{}, boolean> = ({
  control,
  controller,
  ...props
}) => {
  const {
    field: { value, ...field },
    fieldState,
  } = useController(controller);

  return (
    <Form isInvalid={fieldState.invalid} isRequired={control.required} {...control.baseControl}>
      <Flex justify="space-between" align="center" borderRadius="16px" gap={3}>
        <Box>
          <FormLabel fontSize={{ base: '16px', md: 'lg' }} fontWeight="medium" mb={0}>
            {control.label}
          </FormLabel>
          <Text fontSize={{ base: 'sm', md: 'md' }} color="TextSecondary">
            {control.description}
          </Text>
        </Box>
        <Switch variant="main" size="md" isChecked={value} {...field} {...props} />
      </Flex>
      <FormErrorMessage>{fieldState.error?.message}</FormErrorMessage>
    </Form>
  );
};

export function SwitchField(
  props: {
    id?: string;
    label?: ReactNode;
    desc?: ReactNode;
  } & SwitchProps
) {
  const { id, label, desc, ...rest } = props;

  return (
    <Flex justify="space-between" align="center" borderRadius="16px" gap={6}>
      <Box>
        <FormLabel htmlFor={id} fontSize="md" fontWeight="medium" mb={0}>
          {label}
        </FormLabel>
        <Text color="TextSecondary">{desc}</Text>
      </Box>
      <Switch id={id} variant="main" size="md" {...rest} />
    </Flex>
  );
}
