import {
  Center,
  Flex,
  Input,
  InputGroup,
  InputLeftAddon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { HexAlphaColorPicker, HexColorPicker } from 'react-colorful';
import { ColorPickerBaseProps } from 'react-colorful/dist/types';
import { FormComponentProps, FormControlCard } from './Form';
import { useColors } from '@/theme';
import { Override } from '@/utils/types';
import { forwardRef } from 'react';
import { convertHexToRGBA } from '@/utils/common';

export type ColorPickerProps = Override<
  Omit<ColorPickerBaseProps<string>, 'color'>,
  {
    value?: string;
    onChange?: (color: string) => void;
    supportAlpha?: boolean;
  }
>;

export type ColorPickerFormProps = FormComponentProps<ColorPickerProps>;

export const SmallColorPickerForm = forwardRef<HTMLInputElement, ColorPickerFormProps>(
  ({ value, control, onChange, ...props }, ref) => {
    return (
      <FormControlCard {...control}>
        <Popover>
          <PopoverTrigger>
            <InputGroup>
              <InputLeftAddon bg={value} rounded="xl" h="full" />
              <Input
                value={value ?? ''}
                placeholder={value ?? 'Select a color'}
                onChange={(e) => onChange?.(e.target.value)}
                variant="main"
                ref={ref}
              />
            </InputGroup>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <ColorPicker value={value} onChange={onChange} {...props} />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </FormControlCard>
    );
  }
);

SmallColorPickerForm.displayName = 'SmallColorPickerForm';

export const ColorPickerForm = forwardRef<HTMLInputElement, ColorPickerFormProps>(
  ({ control, value, onChange, ...props }, ref) => {
    const { textColorSecondary } = useColors();

    return (
      <FormControlCard {...control}>
        <SimpleGrid minChildWidth="200px" gap={2}>
          <Flex direction="column" gap={3}>
            <Center
              minH="150px"
              rounded="xl"
              border="1px solid"
              borderColor="inputBorder"
              bgColor={value == null ? 'inputBackground' : convertHexToRGBA(value)}
              flex={1}
            >
              {value == null && (
                <Text fontSize="sm" color={textColorSecondary}>
                  No Color
                </Text>
              )}
            </Center>
            <Input
              mt="auto"
              value={value ?? ''}
              placeholder={value ?? 'Select a color'}
              onChange={(e) => onChange?.(e.target.value)}
              variant="main"
              ref={ref}
            />
          </Flex>
          <ColorPicker value={value} onChange={onChange} {...props} />
        </SimpleGrid>
      </FormControlCard>
    );
  }
);

ColorPickerForm.displayName = 'ColorPickerForm';

export function ColorPicker({ value, onChange, supportAlpha, ...rest }: ColorPickerProps) {
  const props: Partial<ColorPickerBaseProps<string>> = {
    color: value,
    onChange,
    style: {
      width: '100%',
    },
    ...rest,
  };

  return supportAlpha ? <HexAlphaColorPicker {...props} /> : <HexColorPicker {...props} />;
}
