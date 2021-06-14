// import './App.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from './components/Main';
import ConfigureStore from './redux';

const store = ConfigureStore();

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Provider store={store}>
          <Main />
        </Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
