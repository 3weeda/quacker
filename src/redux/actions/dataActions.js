import { SET_QUACKS, SET_QUACK, LOADING_DATA, LIKE_QUACK, UNLIKE_QUACK, DELETE_QUACK, LOADING_UI, POST_QUACK, SET_ERRORS, CLEAR_ERRORS, STOP_LOADING_UI } from '../types';
import axios from 'axios';

// Get all quacks
export const getQuacks = () => dispatch => {
    dispatch({ type: LOADING_DATA });
    axios.get('/screams')
        .then(res => {
            dispatch({
                type: SET_QUACKS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: SET_QUACKS,
                payload: []
            })
        })
}

// Get one quack
export const getQuack = screamId => dispatch => {
    dispatch({ type: LOADING_UI });
    axios.get(`/scream/${screamId}`)
        .then(res => {
            dispatch({
                type: SET_QUACK,
                payload: res.data
            })
            dispatch({ type: STOP_LOADING_UI })
        })
        .catch(err => console.log(err));
}

// post a quack
export const postQuack = newQuack => dispatch => {
    dispatch({ type: LOADING_UI })
    axios.post('/scream', newQuack)
        .then(res => {
            dispatch({
                type: POST_QUACK,
                payload: res.data
            })
            dispatch({ type: CLEAR_ERRORS })
        })
        .catch(err => {
            dispatch({
                type: SET_ERRORS,
                payload: err.response.data
            })
        });
}

// like a quack
export const likeQuack = screamId => dispatch => {
    axios.get(`/scream/${screamId}/like`)
        .then(res => {
            dispatch({
                type: LIKE_QUACK,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

// unlike a quack
export const unlikeQuack = screamId => dispatch => {
    axios.get(`/scream/${screamId}/unlike`)
        .then(res => {
            dispatch({
                type: UNLIKE_QUACK,
                payload: res.data
            })
        })
        .catch(err => console.log(err));
}

// delete a quack
export const deleteQuack = screamId => dispatch => {
    axios.delete(`/scream/${screamId}`)
        .then(() => {
            // we pass the id to delete it from local state and avoid re-fetching the modified quacks
            dispatch({ type: DELETE_QUACK, payload: screamId })
        })
        .catch(err => console.log(err));
}

// clear errors
export const clearErrors = () => dispatch => {
    dispatch({ type: CLEAR_ERRORS })
}