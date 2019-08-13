
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import { reduxFirestore } from 'redux-firestore';
import { reactReduxFirebase } from 'react-redux-firebase';
import { composeWithDevTools } from 'redux-devtools-extension';
import firebase, { rrfConfig } from './fbConfig';
import rootReducer from '../store/reducers/rootReducer';
import rootSaga from '../store/sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      reactReduxFirebase(firebase, rrfConfig),
      reduxFirestore(firebase),
      composeWithDevTools(applyMiddleware(sagaMiddleware)),
    )
  );

  if (module.hot) {
    module.hot.accept('../store/reducers/rootReducer', () => {
      const nextRootReducer = require('../store/reducers/rootReducer/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(rootSaga);

  return store;
}


