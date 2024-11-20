import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import LayoutSaga from './layout/saga';
import { watchCreateGroup } from './chat/saga';

export default function* rootSaga(getState) {
    yield all([
        authSaga(),
        LayoutSaga(),
        watchCreateGroup(),

    ]);
}
