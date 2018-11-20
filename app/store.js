import { createStore, applyMiddleware }                  from 'redux';
import { routerMiddleware }                              from 'react-router-redux';
import { composeWithDevTools }                           from 'redux-devtools-extension';
import { createLogger }                                  from "redux-logger";
import promise                                           from "redux-promise-middleware";
import thunk                                             from 'redux-thunk';

import createBrowserHistory                              from 'history/createBrowserHistory';
import createMemoryHistory                               from 'history/createMemoryHistory';

import reducers                                          from './reducers/reducers';

export default function configureStore(initialState = {}, fromServer) {
  let history;
  if (fromServer) {
    history                 = createMemoryHistory();
  }
  else {
    history                 = createBrowserHistory();
  }

  const initializedRouterMW = routerMiddleware(history);
  const middleware          = composeWithDevTools(applyMiddleware( initializedRouterMW, thunk, promise(), createLogger() ));
  const store               = createStore( reducers, initialState, middleware );

  if (process.env.NODE_ENV === 'development') {
    if (module.hot) {
      module.hot.accept('./reducers/reducers', () => store.replaceReducer(require('./reducers/reducers')));
    }
  }
  return { history, store };
}
