import React, {useReducer} from 'react';
import {SliderContext} from './sliderContext'
import {sliderReducer} from './sliderReducer'
import {settingTimeTransition, slides} from '../components/settingsSlider'
import {SET_ACTIVE_INDEX, SET_ACTIVE_SLIDES, SET_POSITION, SET_TIME, SLIDING} from "./types";

export const SliderState = ({children}) => {
    const initialState = {
        position: -100,
        time: 500,
        coords: {
            startX: null,
            endX: null
        },
        activeIndex: 0,
        activeSlides: [
            slides[slides.length - 1],
            slides[0],
            slides[1]
        ]
    };

    const [state, dispatch] = useReducer(sliderReducer, initialState)

    const getSlidesPosition = (newIndex) => {
        const nextIndex = newIndex + 1
        const prevIndex = newIndex - 1
        const maxIndex = slides.length - 1
        const centerActiveSlides = [
            slides[newIndex - 1],
            slides[newIndex],
            slides[newIndex + 1]
        ]
        const rightActiveSlides = [
            slides[maxIndex - 1],
            slides[maxIndex],
            slides[0]
        ]
        const leftActiveSlides = [
            slides[maxIndex],
            slides[0],
            slides[1]
        ]
        return {nextIndex, prevIndex, maxIndex, centerActiveSlides, rightActiveSlides, leftActiveSlides}
    }

    const setNewSlides = (newIndex) => {
        const {nextIndex, prevIndex, maxIndex, centerActiveSlides, rightActiveSlides, leftActiveSlides} = getSlidesPosition(newIndex)

        if (slides[prevIndex] && slides[nextIndex]) {
            dispatch({type: SET_ACTIVE_INDEX, payload: newIndex})
            dispatch({type: SET_ACTIVE_SLIDES, payload: centerActiveSlides})

        } else {
            if (!slides[nextIndex] && nextIndex > maxIndex) {
                dispatch({type: SET_ACTIVE_INDEX, payload: maxIndex})
                dispatch({type: SET_ACTIVE_SLIDES, payload: rightActiveSlides})
            }
            if (!slides[prevIndex] && prevIndex < 0) {
                dispatch({type: SET_ACTIVE_INDEX, payload: 0})
                dispatch({type: SET_ACTIVE_SLIDES, payload: leftActiveSlides})
            }

            if (!slides[newIndex]) {
                if (newIndex < 0) {
                    dispatch({type: SET_ACTIVE_INDEX, payload: maxIndex})
                    dispatch({type: SET_ACTIVE_SLIDES, payload: rightActiveSlides})
                }
                if (newIndex > maxIndex) {
                    dispatch({type: SET_ACTIVE_INDEX, payload: 0})
                    dispatch({type: SET_ACTIVE_SLIDES, payload: leftActiveSlides})
                }
            }
        }
    }

    const changeSlideHandler = (newIndex, position) => {
        dispatch({type: SET_TIME, payload: settingTimeTransition})
        dispatch({type: SET_POSITION, payload: state.position + position})

        window.setTimeout(() => {
                setNewSlides(newIndex)
                dispatch({type: SET_TIME, payload: 0})
                dispatch({type: SET_POSITION, payload: -100})

            }
            , settingTimeTransition
        )
    }

    const handlerOnDown = startX => {
        dispatch({
            type: SLIDING,
            payload: Object.assign(
                state.coords,
                {
                    startX: startX
                }
            )
        })
    }

    const handlerOnUp = endX => {
        dispatch({
            type: SLIDING,
            payload: Object.assign(
                state.coords,
                {
                    endX: endX
                }
            )
        })

        if (state.coords.startX && state.coords.endX) {
            if (state.coords.startX > state.coords.endX) {
                changeSlideHandler(state.activeIndex + 1, -100)
            }
            if (state.coords.startX < state.coords.endX) {
                changeSlideHandler(state.activeIndex - 1, 100)
            }
        }

        dispatch({
            type: SLIDING, payload: Object.assign(
                state.coords,
                {
                    startX: null,
                    endX: null
                }
            )
        })
    }

    return (
        <SliderContext.Provider value={{
            activeIndex: state.activeIndex,
            position: state.position,
            time: state.time,
            activeSlides: state.activeSlides,
            changeSlideHandler,
            setNewSlides,
            handlerOnDown,
            handlerOnUp
        }}>
            {children}
        </SliderContext.Provider>
    )

};

