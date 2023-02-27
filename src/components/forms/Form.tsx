import {
  FormControl,
  FormControlProps,
  FormErrorMessage,
  FormLabel,
} from '@chakra-ui/form-control';
import { Flex, Spacer, Text } from '@chakra-ui/layout';
import { ReactNode } from 'react';
import { useColors } from '@/theme';

export function FormCard(props: FormControlProps) {
  const { cardBg, shadow } = useColors();

  return <FormControl bg={cardBg} rounded="3xl" p={4} boxShadow={shadow} {...props} />;
}

export type FormControlCardProps = {
  label?: string | ReactNode;
  description?: string | ReactNode;
  required?: boolean;
  baseControl?: FormControlProps;
  /**
   * Show an error message if not null
   */
  error?: string;
  children: ReactNode;
};

export type FormComponentProps<V> = V & Omit<FormControlCardProps, keyof V | 'children'>;

export function FormControlCard({
  label,
  description,
  required,
  baseControl,
  children,
  error,
}: FormControlCardProps) {
  const { cardBg, textColorSecondary, shadow } = useColors();

  return (
    <FormControl
      as={Flex}
      direction="column"
      bg={cardBg}
      rounded="3xl"
      p={4}
      isRequired={required}
      isInvalid={error != null}
      boxShadow={shadow}
      {...baseControl}
    >
      <FormLabel
        fontSize={{ base: 'lg', lg: 'xl' }}
        fontWeight={{ base: '600', lg: 'bold' }}
        mb={0}
      >
        {label}
      </FormLabel>
      <Text color={textColorSecondary}>{description}</Text>
      <Spacer mt={2} />
      {children}
      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
}
