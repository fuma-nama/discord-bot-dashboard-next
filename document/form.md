# The `useForm` hook

We are using [`react-hook-form`](https://react-hook-form.com/) for forms, including feature configuration or settings page

## Built-in Components

There're some common components such as `<FilePicker />` in the [src/components/forms/\*](./src/components/forms) folder

## Controller

We add `useController` into custom components so as to provides better code quality

Therefore, You don't have to wrap the inputs into the `<Controller />` component

For example, the Color picker & Switch field can be used in this way

```tsx
<ColorPickerForm
  control={{
    label: 'Color',
    description: 'The color of message',
  }}
  controller={{ control, name: 'color' }} //from the useForm hook
/>
```

[Learn More](https://react-hook-form.com/api/usecontroller/)

## Example

Take a look at [here](./src/config/example/WelcomeMessageFeature.tsx) for examples
