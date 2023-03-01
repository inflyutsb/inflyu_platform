import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import RouteF from "./Routes/index";
import { Provider } from 'react-redux';
import { store } from '../src/Store/store';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RouteF />
    </BrowserRouter>
  </Provider>
  , document.getElementById('root')
)
