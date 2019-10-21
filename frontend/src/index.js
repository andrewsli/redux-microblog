import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './Components/App';
import * as serviceWorker from './serviceWorker';
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import {
  uiReducer, titleReducer, postReducer,
  commentReducer, voteReducer
} from "./reducers";
import reduceReducers from 'reduce-reducers';
import { BrowserRouter } from "react-router-dom";

const INITIAL_STATE = {
  posts: {},
  titles: [],
  loading: true,
  err: ''
};

const microblogReducer = reduceReducers(INITIAL_STATE, uiReducer, titleReducer, postReducer, commentReducer, voteReducer);

const store = createStore(microblogReducer,
  compose(
    applyMiddleware(thunk),
    // window.__REDUX_DEVTOOLS_EXTENSION__
    // && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
