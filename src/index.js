import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from './App';
import configureStore from './config/configureStore';

const store = configureStore();
store.firebaseAuthIsReady.then(()=>{
  ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById("app"));
});

module.hot.accept();