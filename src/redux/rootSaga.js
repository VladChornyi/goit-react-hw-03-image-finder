import { all } from 'redux-saga/effects';
import { imagesWatcher } from './sagas';

export function* rootSaga() {
  yield all([imagesWatcher()]);
}
