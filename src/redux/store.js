import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

import initialState from './initialState';
import thunk from 'redux-thunk';
import tablesReducer from './tablesRedux';

const subreducers = { tables: tablesReducer };

const reducer = combineReducers(subreducers);

const store = createStore(
  reducer,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
