import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
  },
  colors: {
    brand: {
      50: '#f5f7fa',
      100: '#edf2f7',
      200: '#e2e8f0',
      300: '#cbd5e0',
      400: '#a0aec0',
      500: '#718096',
      600: '#4a5568',
      700: '#2d3748',
      800: '#1a202c',
      900: '#171923',
    },
  },
  styles: {
    global: {
      body: {
        bg: 'brand.50',
        color: 'brand.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'lg',
      },
      variants: {
        solid: {
          bg: 'brand.800',
          color: 'white',
          _hover: {
            bg: 'brand.700',
          },
        },
        outline: {
          borderColor: 'brand.800',
          color: 'brand.800',
        },
      },
    },
  },
});

export default theme; 