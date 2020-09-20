import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ApolloProvider } from '@apollo/react-hooks';
import { client } from './utils';
// import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import { store, persistor } from './utils';

const RootApp: FC = () => (
  <ApolloProvider client={client}>
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <Router>
          <App />
        </Router>
      </PersistGate>
    </ReduxProvider>
  </ApolloProvider>
);
ReactDOM.render(<RootApp />, document.querySelector('#root'));
