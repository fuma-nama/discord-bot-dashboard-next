import { Box, HStack } from '@chakra-ui/layout';
import {
  chakraComponents,
  ChakraStylesConfig,
  OptionBase,
  Props,
  Select,
  SelectComponent,
  SelectInstance,
} from 'chakra-react-select';
import { forwardRef, ReactNode } from 'react';
import { dark, light } from '@/theme/colors';
import { useColorModeValue } from '@chakra-ui/react';

const customComponents = {
  SingleValue: ({ children, ...props }: any) => {
    return (
      <chakraComponents.SingleValue {...props}>
        <HStack>
          {props.data.icon}
          <span>{children}</span>
        </HStack>
      </chakraComponents.SingleValue>
    );
  },
  Option: ({ children, ...props }: any) => {
    return (
      <chakraComponents.Option {...props}>
        <Box mr={2}>{props.data.icon}</Box> {children}
      </chakraComponents.Option>
    );
  },
};

const styles: ChakraStylesConfig<any, any, any> = {
  menuList: (provided) => ({
    ...provided,
    _light: {
      ...(provided as any)._light,
      shadow: light.shadow,
    },
    _dark: {
      ...(provided as any)._dark,
      shadow: dark.shadow,
    },
  }),
  placeholder: (provided) => ({
    ...provided,
    _light: {
      color: 'secondaryGray.700',
    },
    _dark: {
      color: 'secondaryGray.600',
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    bg: 'transparent',
  }),
  groupHeading: (provided) => ({
    ...provided,
    _light: {
      bg: 'secondaryGray.100',
    },
    _dark: {
      bg: 'navy.800',
    },
  }),
  option: (provided, options) => ({
    ...provided,
    color: options.isSelected && 'white',
    _light: {
      bg: options.isSelected && light.brand,
      _hover: {
        bg: options.isSelected ? light.brand : 'white',
      },
    },
    _dark: {
      bg: options.isSelected && dark.brand,
      _hover: {
        bg: options.isSelected ? dark.brand : 'whiteAlpha.200',
      },
    },
  }),
  control: (provided, data) => ({
    ...provided,
    rounded: '2xl',
    _light: {
      borderColor: data.isFocused ? light.brand : 'secondaryGray.500',
      bg: 'secondaryGray.300',
    },
    _dark: {
      borderColor: data.isFocused ? dark.brand : 'navy.600',
      bg: 'blackAlpha.300',
    },
  }),
};

export type Option = OptionBase & {
  label: string;
  value: string;
  icon?: ReactNode;
};

export const SelectFieldBase = forwardRef<SelectInstance, Props>((props, ref) => {
  return (
    <Select<any, any, any>
      focusBorderColor={useColorModeValue(light.brand, dark.brand)}
      components={customComponents}
      chakraStyles={styles}
      ref={ref}
      {...props}
    />
  );
});

SelectFieldBase.displayName = 'SelectField';

export const SelectField = SelectFieldBase as SelectComponent;
