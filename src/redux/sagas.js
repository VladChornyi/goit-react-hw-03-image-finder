import { call, put, takeEvery, all } from 'redux-saga/effects';
import { getImagesApi } from '../utils/serviceAPI';
import {
  getImagesSuccess,
  getImagesError,
  getMoreImagesSuccess,
  getMoreImagesError,
} from './imagesSlice';

function* fetchImagesWorker(action) {
  try {
    const images = yield call(getImagesApi, action.payload);
    yield put(getImagesSuccess(images));
  } catch (error) {
    yield put(getImagesError(error.message));
  }
}

function* fetchMoreImagesWorker(action) {
  try {
    const images = yield call(getImagesApi, action.payload);
    yield put(getMoreImagesSuccess(images));
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  } catch (error) {
    yield put(getMoreImagesError(error.message));
  }
}

export function* imagesWatcher() {
  yield all([
    takeEvery('images/getImagesRequest', fetchImagesWorker),
    takeEvery('images/getMoreImagesRequest', fetchMoreImagesWorker),
  ]);
}
