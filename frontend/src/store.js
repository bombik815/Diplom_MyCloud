import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
    addFilesReducer,
    filesListsReducer,
    detailFilesReducer,
    updateFilesReducer,
    deleteFilesReducer
} from './reducer/fileReducer';

import {
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducer/userReducers';


const reducer = combineReducers({
    fileLists: filesListsReducer,
    addFile: addFilesReducer,
    detailFile: detailFilesReducer,
    updateFile: updateFilesReducer,
    deleteFile: deleteFilesReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo') ?
    JSON.parse(localStorage.getItem('userInfo')) : null


const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;