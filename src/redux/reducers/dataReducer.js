import { SET_QUACKS, SET_QUACK, LOADING_DATA, LIKE_QUACK, UNLIKE_QUACK, DELETE_QUACK, POST_QUACK } from '../types';

const initialState = {
    quacks: [],
    quack: {},
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_QUACKS:
            return {
                ...state,
                quacks: action.payload,
                loading: false
            }
        case SET_QUACK:
            return {
                ...state,
                quack: action.payload,
                loading: false
            }
        case LIKE_QUACK:
        case UNLIKE_QUACK:
            let index = state.quacks.findIndex(quack => quack.screamId === action.payload.screamId)
            //replace liked quack with another one
            state.quacks[index] = action.payload
            // update number of likes
            if (state.quack.screamId === action.payload.screamId) {
                state.quack = action.payload
            }
            return {
                ...state,
            }
        case DELETE_QUACK:
            return {
                ...state,
                quacks: state.quacks.filter(quack => quack.screamId !== action.payload)
            }
        case POST_QUACK:
            return {
                ...state,
                quacks: [
                    action.payload,
                    ...state.quacks
                ]
            }
        default:
            return state;
    }
}