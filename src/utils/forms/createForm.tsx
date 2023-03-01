import { ComponentProps, Fragment, ReactElement } from 'react';
import { ColorPickerForm, SmallColorPickerForm } from '@/components/forms/ColorPicker';
import { DatePickerForm, SmallDatePickerForm } from '@/components/forms/DatePicker';
import { FilePickerForm } from '@/components/forms/FilePicker';
import { FormComponentProps, FormControlCard } from '@/components/forms/Form';
import { InputForm } from '@/components/forms/InputForm';
import { SwitchForm } from '@/components/forms/SwitchField';
import { TextAreaForm } from '@/components/forms/TextAreaForm';

export type FormInput = (
  | Input
  | DatePicker
  | SmallDatePicker
  | ColorPicker
  | SmallColorPicker
  | Switch
  | FilePicker
  | TextArea
  | Custom
  | CustomForm
) &
  IForm;

interface IForm {}

export type Input = ComponentProps<typeof InputForm> & { type: 'input' };
export type TextArea = ComponentProps<typeof TextAreaForm> & { type: 'textarea' };

export type DatePicker = ComponentProps<typeof DatePickerForm> & { type: 'date' };
export type SmallDatePicker = ComponentProps<typeof SmallDatePickerForm> & { type: 'small-date' };

export type ColorPicker = ComponentProps<typeof ColorPickerForm> & { type: 'color' };
export type SmallColorPicker = ComponentProps<typeof SmallColorPickerForm> & {
  type: 'small-color';
};

export type FilePicker = ComponentProps<typeof FilePickerForm> & { type: 'file' };

export type Switch = ComponentProps<typeof SwitchForm> & { type: 'switch' };

export type Custom = { type: 'custom'; component: ReactElement };
export type CustomForm = FormComponentProps<{ type: 'custom-form'; component: ReactElement }>;

export type FormOptions = {
  /**
   * memorize specified keys in all inputs
   */
  defaultMemorize?: string[];
};

export function createForm(...inputs: FormInput[]) {
  function getForm(input: FormInput) {
    switch (input.type) {
      case 'input': {
        const { type, ...props } = input;

        return <InputForm {...props} />;
      }
      case 'textarea': {
        const { type, ...props } = input;

        return <TextAreaForm {...props} />;
      }
      case 'date': {
        const { type, ...props } = input;

        return <DatePickerForm {...props} />;
      }
      case 'small-date': {
        const { type, ...props } = input;

        return <SmallDatePickerForm {...props} />;
      }
      case 'custom-form': {
        return <FormControlCard {...input.control}>{input.component}</FormControlCard>;
      }
      case 'custom': {
        return input.component;
      }
      case 'color': {
        const { type, ...props } = input;

        return <ColorPickerForm {...props} />;
      }
      case 'small-color': {
        const { type, ...props } = input;

        return <SmallColorPickerForm {...props} />;
      }
      case 'file': {
        const { type, ...props } = input;

        return <FilePickerForm {...props} />;
      }
      case 'switch': {
        const { type, ...props } = input;

        return <SwitchForm {...props} />;
      }
    }
  }

  return (
    <>
      {inputs.map((input, i) => {
        return <Fragment key={i}>{getForm(input)}</Fragment>;
      })}
    </>
  );
}
