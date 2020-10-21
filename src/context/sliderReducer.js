import {
    SET_ACTIVE_INDEX,
    SET_ACTIVE_SLIDES,
    SET_POSITION,
    SET_TIME, SLIDING
} from "./types";

export const sliderReducer = (state, action) => {
    switch (action.type) {
        case SET_ACTIVE_INDEX:
            return {
                ...state,
                activeIndex: action.payload
            }
        case SET_ACTIVE_SLIDES:
            return {
                ...state,
                activeSlides:action.payload
            }
        case SET_TIME:
            return {
                ...state,
                time: action.payload
            }
        case SET_POSITION:
            return {
                ...state,
                position: action.payload
            }
        case SLIDING:
            return {
                ...state,
                coords: action.payload
            }
        default:
            return state
    }
}