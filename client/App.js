// import './App.css';
import React, { Component } from 'react';

import { BrowserRouter } from 'react-router-dom';

// import Main from './components/MainComponent';

// import { Provider } from 'react-redux';
// import { ConfigureStore } from './redux/configureStore';

// const store = ConfigureStore();

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>Test app goes here!</div>
          {/* <Provider store={store}>
            <Main/>
          </Provider> */}
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
