import { Calendar, CalendarProps } from 'react-calendar';
import { FormComponentProps, FormControlCard } from './Form';
import { Icon } from '@chakra-ui/react';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import { Text } from '@chakra-ui/layout';
import {
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@chakra-ui/react';
import { AiTwotoneCalendar as CalendarIcon } from 'react-icons/ai';
import { forwardRef } from 'react';

export type DatePickerProps = CalendarProps;

export function DatePicker(props: DatePickerProps) {
  return (
    <Calendar
      view={'month'}
      tileContent={<Text color="brand.500" />}
      prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
      nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
      {...props}
    />
  );
}

export type DatePickerFormProps = FormComponentProps<DatePickerProps>;

export const DatePickerForm = forwardRef<HTMLInputElement, DatePickerFormProps>(
  function DatePickerForm({ control, value, ...props }, ref) {
    return (
      <FormControlCard {...control}>
        <DatePicker value={value ?? null} inputRef={ref as any} {...props} />
      </FormControlCard>
    );
  }
);

export const SmallDatePickerForm = forwardRef<HTMLInputElement, DatePickerFormProps>(
  function SmallDatePickerForm({ value, control, ...props }, ref) {
    const text = value?.toLocaleString(undefined, {
      dateStyle: 'short',
    });

    return (
      <FormControlCard {...control}>
        <Popover>
          <PopoverTrigger>
            <InputGroup>
              <Input value={text ?? ''} placeholder="Select a Date" variant="main" readOnly />
              <InputRightElement zIndex={0}>
                <CalendarIcon />
              </InputRightElement>
            </InputGroup>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <DatePicker value={value ?? null} inputRef={ref as any} {...props} />
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </FormControlCard>
    );
  }
);
