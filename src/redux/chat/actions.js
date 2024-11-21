import {
    CHAT_USER,
    ACTIVE_USER,
    FULL_USER,
    ADD_LOGGED_USER,
    CREATE_GROUP,
    CREATE_GROUP_REQUEST,
    FETCH_ALL_GROUPS_FAILURE,
    FETCH_ALL_GROUPS_SUCCESS,
    FETCH_ALL_GROUPS




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

export const fetchAllServers = () => ({
   
    type : FETCH_ALL_GROUPS
    
})

export const fetchAllServersSuccess = (data) => ({
    type : FETCH_ALL_GROUPS_SUCCESS,
    payload : data
})

export const fetchAllServersFailure = (error) => ({
    type : FETCH_ALL_GROUPS_FAILURE,
    payload : error
})


