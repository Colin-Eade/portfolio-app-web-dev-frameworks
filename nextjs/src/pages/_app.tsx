import { ChakraProvider } from '@chakra-ui/react';
import theme from '@/theme';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import store from '@/store';

/**
 * Main App component that wraps all pages.
 * Provides Chakra UI theme context to the entire application.
 */
const App = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
};

export default App;
