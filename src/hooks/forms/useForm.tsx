import { FormRender } from 'config/types';
import { Dispatch, SetStateAction, ReactElement, useState, useMemo } from 'react';
import { createForm, FormInput, FormOptions } from './createForm';
import { converter } from './useFormValue';

export type FormErrors<V> = {
  [K in keyof V]?: string;
};

export type UseFormOptions<V> = {
  /**
   * Used for create initial state if it is not defined
   *
   * default: `{}`
   */
  emptyValue?: V;

  /**
   * If defined a default value, combine the current value with default values
   *
   * Similar to initial value but won't be submitted
   */
  defaultValue: V;

  /**
   * initial state
   */
  initialState?: FormState<V>;

  /**
   * Convert value to json/form body used for http request
   */
  serializer?: 'json' | 'form' | ((v: V) => FormData | string);

  /**
   * Verify input value before submit
   */
  verify?: (v: V, errors: FormErrors<V>) => void;
};

export type UseFormResult<V> = {
  value: V;
  update: Dispatch<Partial<V>>;
  setState: Dispatch<FormState<V>>;

  /**
   * Check if value contains errors and update errors state
   *
   * @param keys If not empty, Only update errors of specified keys
   * @return true if invalid
   */
  checkValue: (...keys: (keyof V)[]) => boolean;
  errors: FormErrors<V>;
  setErrors: Dispatch<(prev: FormErrors<V>) => FormErrors<V>>;

  render: (element: ReactElement) => FormRender;
};

type FormState<V> = {
  value: V;
  updated: boolean;
  errors: {
    [K in keyof V]?: string;
  };
};

export function useForm<V>(options: UseFormOptions<V>): UseFormResult<V> {
  const initialState = () =>
    options.initialState ?? {
      updated: false,
      errors: {},
      value: options.emptyValue ?? ({} as V),
    };

  const [state, setState] = useState<FormState<V>>(() => initialState());
  const convert = converter(options.serializer ?? 'json');
  const setValue = (action: SetStateAction<V>) => {
    typeof action === 'function'
      ? setState((prev) => ({
          ...prev,
          updated: true,
          value: (action as (prev: V) => V)(prev.value),
        }))
      : setState((prev) => ({
          ...prev,
          updated: true,
          value: action,
        }));
  };

  const checkValue = (...keys: (keyof V)[]) => {
    let errors: FormErrors<V> = {};
    options.verify?.(state.value, errors);
    if (keys.length !== 0) errors = filterKeys<FormErrors<V>>(errors, keys);

    setState((prev) => ({ ...prev, errors }));
    return Object.keys(errors).length > 0;
  };

  const combinedValue = useMemo(
    () =>
      options.defaultValue == null
        ? state.value
        : {
            ...options.defaultValue,
            ...state.value,
          },
    [state.value, options.defaultValue]
  );

  return {
    value: combinedValue,
    errors: state.errors,
    checkValue,
    setErrors: (dispatch) => setState((prev) => ({ ...prev, errors: dispatch(prev.errors) })),
    update: (action) => setValue((prev) => ({ ...prev, ...action })),
    setState,
    render: (element) => {
      return {
        canSave: state.updated && Object.keys(state.errors).length === 0,
        onSubmit: () => checkValue(),
        serialize: () => convert(state.value),
        reset: () => setState(initialState()),
        component: element,
      };
    },
  };
}

export type UseFormRenderOptions<V> = UseFormOptions<V> & {
  render: (result: UseFormResult<V>) => [options: FormOptions, ...inputs: FormInput[]];
  container?: (form: ReactElement) => ReactElement;
};

export function useFormRender<V>({
  render,
  container,
  ...options
}: UseFormRenderOptions<V>): FormRender {
  const result = useForm<V>(options);
  const rendered = createForm(...render(result));

  return result.render(container == null ? rendered : container(rendered));
}

function filterKeys<V extends object>(obj: V, keys: (keyof V)[]): Partial<V> {
  const temp: Partial<V> = {};

  for (const key of keys) {
    if (key in obj) temp[key] = obj[key];
  }

  return temp;
}
