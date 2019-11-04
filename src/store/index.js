import 'regenerator-runtime/runtime'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {persistReducer, persistStore} from 'redux-persist';
import reducers from '../reducers'
import storage from "redux-persist/lib/storage";
import sagas from '../sagas'
import middleware, {sagaMiddleware} from './middleware';

const reducer = persistReducer(
  {
    key: 'rules-engine-ui',
    storage,
  },
  combineReducers({...reducers}),
);

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configStore = (initialState = {}) => {
  const store = createStore(reducer, initialState, composeEnhancer(applyMiddleware(...middleware)));

  sagaMiddleware.run(sagas);

  return {
    persistor: persistStore(store),
    store,
  };
};

const {store, persistor} = configStore();

global.store = store;

export {store, persistor};
