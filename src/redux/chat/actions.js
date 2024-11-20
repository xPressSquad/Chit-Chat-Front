import {
    CHAT_USER,
    ACTIVE_USER,
    FULL_USER,
    ADD_LOGGED_USER,
    CREATE_GROUP,
    CREATE_GROUP_REQUEST,
} from './constants';

export const createGroupRequest = (groupData) => ({
    type: CREATE_GROUP_REQUEST,
    payload: groupData,
});



export const chatUser = () => ({
    type: CHAT_USER
});

export const activeUser = (userId) => ({
    type: ACTIVE_USER,
    payload : userId
});

export const setFullUser = (fullUser) => ({
    type: FULL_USER,
    payload : fullUser
});

export const addLoggedinUser = (userData) => ({
    type: ADD_LOGGED_USER,
    payload : userData
});

export const createGroup = (groupData) => ({
    type : CREATE_GROUP,
    payload : groupData
})
