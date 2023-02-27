import {
  Box,
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
import { HexAlphaColorPicker, HexColorInput, HexColorPicker } from 'react-colorful';
import { ColorPickerBaseProps } from 'react-colorful/dist/types';
import { FormComponentProps, FormControlCard } from './Form';
import { useDebouncedCallback } from 'use-debounce';
import { useColors } from '@/theme';

export type ColorPickerProps = {
  /**
   * hex color
   */
  value?: string;
  onChange: (color: string) => void;
  supportAlpha?: boolean;
};

export type ColorPickerFormProps = FormComponentProps<ColorPickerProps>;

export function SmallColorPickerForm({
  value,
  onChange,
  supportAlpha,
  ...props
}: ColorPickerFormProps) {
  const onChangeDebounced = useDebouncedCallback((value: string) => onChange(value), 100);

  return (
    <FormControlCard {...props}>
      <Popover>
        <PopoverTrigger>
          <InputGroup>
            <InputLeftAddon bg={value} rounded="xl" h="full" />
            <Input
              as={HexColorInput}
              color={value}
              placeholder={value ?? 'Select a color'}
              onChange={onChange as any}
              variant="main"
            />
          </InputGroup>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverBody>
            <ColorPicker value={value} onChange={onChangeDebounced} supportAlpha={supportAlpha} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </FormControlCard>
  );
}

export function ColorPickerForm({ value, onChange, supportAlpha, ...props }: ColorPickerFormProps) {
  const { textColorSecondary } = useColors();
  const onChangeDebounced = useDebouncedCallback((value: string) => onChange(value), 100);

  return (
    <FormControlCard {...props}>
      <SimpleGrid minChildWidth="200px" gap={2}>
        <Flex direction="column" gap={3}>
          <Center minH="150px" rounded="xl" bgColor={value ?? 'blackAlpha.200'} flex={1}>
            {value == null && (
              <Text fontSize="sm" color={textColorSecondary}>
                No Color
              </Text>
            )}
          </Center>
          <Input
            mt="auto"
            as={HexColorInput}
            color={value}
            placeholder={value ?? 'Select a color'}
            onChange={onChange as any}
            variant="main"
          />
        </Flex>
        <ColorPicker value={value} onChange={onChangeDebounced} supportAlpha={supportAlpha} />
      </SimpleGrid>
    </FormControlCard>
  );
}

export function ColorPicker({ value, onChange, supportAlpha }: ColorPickerProps) {
  const props: Partial<ColorPickerBaseProps<string>> = {
    color: value,
    onChange,
    style: {
      width: '100%',
    },
  };

  return supportAlpha ? <HexAlphaColorPicker {...props} /> : <HexColorPicker {...props} />;
}
