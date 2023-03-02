import { Calendar, CalendarProps } from 'react-calendar';
import { ControlledInput, FormControlCard } from './Form';
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
import { useController } from 'react-hook-form';

export type DatePickerProps = Omit<CalendarProps, 'value' | 'onChange'>;

export function DatePicker(props: CalendarProps) {
  return (
    <Calendar
      view={'month'}
      tileContent={<Text color="brand.500" />}
      prevLabel={<Icon as={MdChevronLeft} w="24px" h="24px" mt="4px" />}
      nextLabel={<Icon as={MdChevronRight} w="24px" h="24px" mt="4px" />}
      {...props}
      value={props.value ?? null}
    />
  );
}

export const DatePickerForm: ControlledInput<DatePickerProps, CalendarProps['value']> = ({
  control,
  controller,
  ...props
}) => {
  const {
    field: { ref, ...field },
    fieldState,
  } = useController(controller);

  return (
    <FormControlCard {...control} error={fieldState.error?.message}>
      <DatePicker inputRef={ref} {...field} {...props} />
    </FormControlCard>
  );
};

export const SmallDatePickerForm: ControlledInput<DatePickerProps, CalendarProps['value']> = ({
  control,
  controller,
  ...props
}) => {
  const {
    field: { ref, ...field },
    fieldState,
  } = useController(controller);

  const text = field.value?.toLocaleString(undefined, {
    dateStyle: 'short',
  });

  return (
    <FormControlCard {...control} error={fieldState.error?.message}>
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
            <DatePicker inputRef={ref} {...field} {...props} />
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </FormControlCard>
  );
};
