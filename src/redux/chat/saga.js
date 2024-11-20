import { takeLatest, call, put } from 'redux-saga/effects';
import {
    CREATE_GROUP_REQUEST,
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP_FAILURE,
} from './constants';

function* createGroupSaga(action) {
    try {
        const response = yield call(fetch, 'http://localhost:5000/servers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.payload),
        });

        const data = yield response.json();

        if (response.ok) {
            yield put({ type: CREATE_GROUP_SUCCESS, payload: data });
        } else {
            yield put({ type: CREATE_GROUP_FAILURE, payload: data.message || 'Failed to create group' });
        }
    } catch (error) {
        yield put({
            type: CREATE_GROUP_FAILURE,
            payload: error.message || 'An error occurred',
        });
    }
}

// Watcher saga
export function* watchCreateGroup() {
    yield takeLatest(CREATE_GROUP_REQUEST, createGroupSaga);
}
    