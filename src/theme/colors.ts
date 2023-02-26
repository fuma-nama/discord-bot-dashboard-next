import { useColorModeValue } from '@chakra-ui/react';

export const colors = {
  brand: {
    100: '#E9E3FF',
    200: '#422AFB',
    300: '#422AFB',
    400: '#7551FF',
    500: '#422AFB',
    600: '#3311DB',
    700: '#02044A',
    800: '#190793',
    900: '#11047A',
  },
  brandScheme: {
    100: '#E9E3FF',
    200: '#7551FF',
    300: '#7551FF',
    400: '#7551FF',
    500: '#422AFB',
    600: '#3311DB',
    700: '#02044A',
    800: '#190793',
    900: '#02044A',
  },
  brandTabs: {
    100: '#E9E3FF',
    200: '#422AFB',
    300: '#422AFB',
    400: '#422AFB',
    500: '#422AFB',
    600: '#3311DB',
    700: '#02044A',
    800: '#190793',
    900: '#02044A',
  },
  secondaryGray: {
    100: '#E0E5F2',
    200: '#E1E9F8',
    300: '#F4F7FE',
    400: '#E9EDF7',
    500: '#8F9BBA',
    600: '#A3AED0',
    700: '#707EAE',
    800: '#707EAE',
    900: '#1B2559',
  },
  red: {
    100: '#FEEFEE',
    500: '#EE5D50',
    600: '#E31A1A',
  },
  blue: {
    50: '#EFF4FB',
    500: '#3965FF',
  },
  orange: {
    100: '#FFF6DA',
    500: '#FFB547',
  },
  green: {
    100: '#E6FAF5',
    500: '#01B574',
  },
  navy: {
    /*
      50: '#d0dcfb',
      100: '#aac0fe',
      200: '#a3b9f8',
      300: '#728fea',
      400: '#3652ba',
      500: '#1b3bbb',
      600: '#24388a',
      700: '#1B254B',
      800: '#111c44',
      900: '#0b1437',
      */
    50: '#d0dcfb',
    100: '#aac0fe',
    200: '#a3b9f8',
    300: '#728fea',
    400: '#3652ba',
    500: '#2f4bba',
    600: '#52619b',
    700: '#1d2343',
    800: '#080e2c',
    900: '#08081c',
  },
  gray: {
    100: '#FAFCFE',
  },
};

export const light = {
  globalBg: 'secondaryGray.300',
  brand: 'brand.500',
  textColorPrimary: 'secondaryGray.900',
  textColorSecondary: 'gray.500',
  textColorDetails: 'navy.700',
  borderColor: 'white !important',
  cardBg: 'white',
  menuBg: 'white',
  shadow: '14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
};

export const dark = {
  globalBg: 'navy.900',
  brand: 'brand.400',
  textColorPrimary: 'white',
  textColorSecondary: 'gray.400',
  textColorDetails: 'secondaryGray.600',
  borderColor: '#111C44 !important',
  cardBg: 'navy.800',
  menuBg: 'navy.800',
  shadow: '14px 17px 40px 4px rgba(112, 144, 176, 0.06)',
};

export function useColors() {
  return useColorModeValue(light, dark);
}

export function useColorsExtend<T>(_light: T, _dark: T) {
  return useColorModeValue({ ...light, ..._light }, { ...dark, ..._dark });
}

export function useItemHoverBg() {
  return useColorModeValue(
    { cursor: 'pointer', bg: 'white', boxShadow: '0px 40px 58px -20px rgba(112, 144, 176, 0.12)' },
    { cursor: 'pointer', bg: 'navy.700', boxShadow: 'unset' }
  );
}
