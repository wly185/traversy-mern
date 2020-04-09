import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; //import as //import from
import rootReducer from './reducers';

const initialState = {}; //init state

const middleware = [thunk]; //only 1 middleware

const store = createStore(
  rootReducer, //index js
  initialState,
  composeWithDevTools(applyMiddleware(...middleware)) //enhancer // redux devtools broswer extension
);

export default store;
