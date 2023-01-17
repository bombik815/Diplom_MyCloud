import axios from '../utils/axios';
import { variables } from './../utils/variables';
// Get files data from API
import {
    GET_FILES_REQUEST,
    GET_FILES_SUCCESS,
    GET_FILES_FAIL,

    ADD_FILES_REQUEST,
    ADD_FILES_SUCCESS,
    ADD_FILES_FAIL,
    ADD_FILES_RESET,

    DETAIL_FILES_REQUEST,
    DETAIL_FILES_SUCCESS,
    DETAIL_FILES_FAIL,

    UPDATE_FILES_REQUEST,
    UPDATE_FILES_SUCCESS,
    UPDATE_FILES_FAIL,
    UPDATE_FILES_RESET,

    DELETE_FILES_REQUEST,
    DELETE_FILES_SUCCESS,
    DELETE_FILES_FAIL,

} from './../constants/fileConstants';



// Get all files of user
export const getListFiles = () => async (dispatch, getState) => {

    try {
        dispatch({ type: GET_FILES_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            variables.API_URL + `files`,
            config)

        dispatch({
            type: GET_FILES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: GET_FILES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


// Add new File
export const addFileList = (fileData) => async (dispatch, getState) => {

    try {
        dispatch({ type: ADD_FILES_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            variables.API_URL + `files/create/`,
            fileData,
            config
        );
        dispatch({
            type: ADD_FILES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADD_FILES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// Detail of File
export const getDetailFile = (id) => async (dispatch, getState) => {

    try {
        dispatch({ type: DETAIL_FILES_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            `${variables.API_URL}files/${id}`,
            config
        );
        dispatch({
            type: DETAIL_FILES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DETAIL_FILES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


// Update of File
export const updateFile = (id, fileData) => async (dispatch, getState) => {

    try {
        dispatch({ type: UPDATE_FILES_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(
            `${variables.API_URL}files/edit/${id}/`,
            fileData,
            config
        );
        dispatch({
            type: UPDATE_FILES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_FILES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}

// Delete of File
export const deleteFile = (id) => async (dispatch, getState) => {

    try {
        dispatch({ type: DELETE_FILES_REQUEST })
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(
            `${variables.API_URL}files/delete/${id}/`,
            config
        );
        dispatch({
            type: DELETE_FILES_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_FILES_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}