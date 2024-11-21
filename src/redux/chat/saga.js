import { takeLatest, call, put } from 'redux-saga/effects';
import {
    CREATE_GROUP_REQUEST,
    CREATE_GROUP_SUCCESS,
    CREATE_GROUP_FAILURE,
  FETCH_ALL_GROUPS, FETCH_ALL_GROUPS_SUCCESS, FETCH_ALL_GROUPS_FAILURE,

  DELETE_GROUP_REQUEST,
  DELETE_GROUP_SUCCESS,
  DELETE_GROUP_FAILURE

    

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
function* fetchAllServersSaga() {
    try {
      const response = yield call(fetch, 'http://localhost:5000/servers', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  

     
        let { data } = yield response.json();

      

       

  
      if (response.ok) {
        yield put({ type: FETCH_ALL_GROUPS_SUCCESS, payload: data });
      } else {
        yield put({ type: FETCH_ALL_GROUPS_FAILURE, payload: 'Failed to fetch servers' });
      }
    } catch (error) {
      yield put({
        type: FETCH_ALL_GROUPS_FAILURE,
        payload: error.message || 'An error occurred',
      });
    }
  }

  function* deleteGroupSaga(action) {
    try {
      const response = yield call(fetch, `http://localhost:5000/servers/${action.payload}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = yield response.json();
    
  
      if (response.ok) {
        yield put({ type: DELETE_GROUP_SUCCESS, payload: data._id });

      } else {
        yield put({ type: DELETE_GROUP_FAILURE, payload: data.message || 'Failed to delete group' });
      }
    } catch (error) {
      yield put({
        type: DELETE_GROUP_FAILURE,
        payload: error.message || 'An error occurred',
      });
    }
  } 

  

// Watcher saga
export function* watchCreateGroup() {
    yield takeLatest(CREATE_GROUP_REQUEST, createGroupSaga);

}

export function* watchFetchAllServers() {
    yield takeLatest(FETCH_ALL_GROUPS, fetchAllServersSaga);
}

export function* watchDeleteGroup() {
    yield takeLatest(DELETE_GROUP_REQUEST, deleteGroupSaga);
}




// export const fetchAllGroups = () => {
//     return async (dispatch) => {
//         dispatch({ type: FETCH_ALL_GROUPS });
//         try {
//             const response = await fetch('http://localhost:5000/groups'); // Update with your endpoint
//             const data = await response.json();

//             if (response.ok) {
//                 dispatch({ type: FETCH_ALL_GROUPS_SUCCESS, payload: data });
//             } else {
//                 dispatch({ type: FETCH_ALL_GROUPS_FAILURE, payload: data.message || 'Failed to fetch groups' });
//             }
//         } catch (error) {
//             dispatch({ type: FETCH_ALL_GROUPS_FAILURE, payload: error.message || 'An error occurred' });
//         }
//     };
// };
