// Chakra imports
import { Flex, FormErrorMessage, FormLabel, Switch, SwitchProps, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useController } from 'react-hook-form';
import { Form } from './Form';
import { ControlledInput } from './types';

export type SwitchFormProps = { id?: string };

export const SwitchFieldForm: ControlledInput<SwitchFormProps, boolean> = ({
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
        <FormLabel htmlFor={props.id} _hover={{ cursor: 'pointer' }} flexDirection="column">
          <Text fontSize={{ base: 'lg', lg: 'xl' }} fontWeight={{ base: '600', lg: 'bold' }}>
            {control.label}
          </Text>
          <Text variant="secondary">{control.description}</Text>
        </FormLabel>
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
    <Flex justify="space-between" align="center" borderRadius="16px" gap={3}>
      <FormLabel htmlFor={id} _hover={{ cursor: 'pointer' }} flexDirection="column">
        <Text color="TextPrimary" fontSize="md" fontWeight="600">
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
