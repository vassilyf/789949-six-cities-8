import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {ToastContainer} from 'react-toastify';
import {store} from './store/store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
      <ToastContainer/>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
