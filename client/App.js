// import './App.css';
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from './components/MainComponent';
import ConfigureStore from './redux';

const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Provider store={store}>
            <Main />
          </Provider>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
