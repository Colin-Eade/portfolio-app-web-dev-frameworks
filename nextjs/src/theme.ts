import { extendTheme } from '@chakra-ui/react';

/**
 * Custom Chakra UI theme configuration.
 * Defines global styles, custom component styles, and variants.
 */
const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundImage:
          'linear-gradient(to bottom right, #e0e0e0, #ffffff, #ffffff, #e0e0e0)',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
      },
    },
  },
  components: {
    Card: {
      baseStyle: {
        container: {
          borderWidth: '1px',
          borderColor: 'gray.300',
        },
      },
    },
    Input: {
      variants: {
        outline: {
          field: {
            background: 'white',
            borderWidth: '1px',
            borderColor: 'gray.300',
            _hover: {
              borderColor: 'gray.400',
            },
            _focus: {
              borderColor: 'blue.500',
            },
          },
        },
      },
    },
    Select: {
      variants: {
        outline: {
          field: {
            background: 'white',
            borderWidth: '1px',
            borderColor: 'gray.300',
            _hover: {
              borderColor: 'gray.400',
            },
            _focus: {
              borderColor: 'blue.500',
            },
          },
        },
      },
    },
    Button: {
      variants: {
        link: {
          _hover: {
            color: 'blue.500',
            textDecoration: 'underline',
          },
        },
      },
    },
    Badge: {
      baseStyle: {
        textTransform: 'none',
        borderRadius: 4,
        mr: 2,
      },
      defaultProps: {
        colorScheme: 'blue',
      },
    },
  },
});

export default theme;
