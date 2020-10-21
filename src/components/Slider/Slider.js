import React, {useEffect, useState} from 'react';
import classes from './Slider.module.scss'
import SlideContent from "./SliderContent/SlideContent";
import ContextSlider from '../context'
import {settingTimeTransition, settingTimeAutoplay, slides} from './settingsSlider'
import Stepper from "./Stepper/Stepper";
import NavButton from "./NavButton/NavButton";

const Slider = (props) => {
    const [position, setPosition] = useState(-100)
    const [time, setTime] = useState(500)
    const [coords, setCoords] = useState({
        startX: null,
        endX: null
    })

    const [activeIndex, setActiveIndex] = useState(0)
    const [activeSlides, setActiveSlides] = useState([
        slides[slides.length - 1],
        slides[activeIndex],
        slides[activeIndex + 1]
    ])

    useEffect(() => {
        const autoplay = setInterval(() => {
            changeSlideHandler(activeIndex + 1, -100)
        }, settingTimeAutoplay);
        return () => clearInterval(autoplay);
    },)


    const setNewSlides = (newIndex) => {
        //const newIndex = activeIndex + step
        const nextIndex = newIndex + 1
        const prevIndex = newIndex - 1
        const maxIndex = slides.length - 1
        const newActiveSlides = [
            slides[newIndex - 1],
            slides[newIndex],
            slides[newIndex + 1]
        ]

        if (slides[prevIndex] && slides[nextIndex]) {
            setActiveIndex(newIndex)
            setActiveSlides(newActiveSlides)

        } else {

            if (!slides[nextIndex] && nextIndex > maxIndex) {
                newActiveSlides[0] = slides[maxIndex - 1]
                newActiveSlides[1] = slides[maxIndex]
                newActiveSlides[2] = slides[0]

                setActiveIndex(maxIndex)
                setActiveSlides(newActiveSlides)
            }

            if (!slides[prevIndex] && prevIndex < 0) {
                newActiveSlides[0] = slides[maxIndex]
                newActiveSlides[1] = slides[0]
                newActiveSlides[2] = slides[1]

                setActiveIndex(0)
                setActiveSlides(newActiveSlides)
            }

            if (!slides[newIndex]) {
                if (newIndex < 0) {
                    newActiveSlides[0] = slides[maxIndex - 1]
                    newActiveSlides[1] = slides[maxIndex]
                    newActiveSlides[2] = slides[0]

                    setActiveIndex(maxIndex)
                    setActiveSlides(newActiveSlides)
                }
                if (newIndex > maxIndex) {
                    newActiveSlides[0] = slides[maxIndex]
                    newActiveSlides[1] = slides[0]
                    newActiveSlides[2] = slides[1]

                    setActiveIndex(0)
                    setActiveSlides(newActiveSlides)
                }
            }
        }
    }

    const changeSlideHandler = (newIndex, position) => {
        setTime(settingTimeTransition)
        setPosition(prevState => prevState + position)

        window.setTimeout(() => {
                setNewSlides(newIndex)
                setTime(0)
                setPosition(-100)
            }
            , settingTimeTransition
        )

    }

    const handlerOnDown = startX => {
        setCoords(prevState =>
            Object.assign(
                prevState, {
                    startX
                }
            ))
    }

    const handlerOnUp = endX => {
        setCoords(prevState =>
            Object.assign(
                prevState, {
                    endX
                }
            ))
        if (coords.startX && coords.endX) {
            //     console.log(coords)

            if (coords.startX > coords.endX) {
                changeSlideHandler(activeIndex + 1, -100)
            }
            if (coords.startX < coords.endX) {
                changeSlideHandler(activeIndex - 1, 100)
            }
        }
        setCoords({
            startX: null,
            endX: null
        })
    }

    return (
        <ContextSlider.Provider value={{
            position,
            time,
            activeSlides,
            changeSlideHandler,
            setPosition,
            handlerOnDown,
            handlerOnUp
        }}>
            <div className={classes.Slider}>
                <SlideContent/>

                <NavButton type='prev' activeIndex={activeIndex} changeSlideHandler={changeSlideHandler}/>
                <NavButton type='next' activeIndex={activeIndex} changeSlideHandler={changeSlideHandler}/>

                <div className={classes.navbar}>
                    <Stepper setNewSlides={setNewSlides} activeIndex={activeIndex}/>
                </div>

            </div>
        </ContextSlider.Provider>
    )
};

export default Slider;