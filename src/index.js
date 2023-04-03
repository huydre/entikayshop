import React from 'react';
import ReactDOM from 'react-dom/client';
import 'remixicon/fonts/remixicon.css';
import 'bootstrap/dist/css/bootstrap.css';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import store from './redux/store';
import App from './App';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ToastContainer
          position="bottom-right"
          autoClose={1000}
          closeOnClick
          theme="light"
        />
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
