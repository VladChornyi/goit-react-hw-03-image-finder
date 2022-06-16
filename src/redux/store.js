import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import imagesReducer from './imagesSlice';
import { rootSaga } from './rootSaga';

const saga = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    images: imagesReducer,
  },
  middleware: [saga],
});

saga.run(rootSaga);
