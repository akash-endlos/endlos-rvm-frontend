import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import '@/styles/globals.css';
import { theme } from '@/utils';
import { ChakraProvider } from '@chakra-ui/react';
import { persistor, store } from '@/redux/store';
import { Toaster } from 'react-hot-toast';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ChakraProvider theme={theme}>
          <Toaster
            position="top-center"
            reverseOrder={true}
          />
          <Component {...pageProps} />
        </ChakraProvider>
      </PersistGate>
    </Provider>
  );
}
