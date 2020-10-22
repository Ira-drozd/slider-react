import React, {useContext, useEffect} from 'react';
import classes from './Slider.module.scss'
import SlideContent from "./SliderContent/SlideContent";
import {settingTimeAutoplay, slides} from '../settingsSlider'
import Stepper from "./Stepper/Stepper";
import NavButton from "./NavButton/NavButton";
import {SliderContext} from "../../context/sliderContext";

const Slider = () => {
    const {
        activeIndex,
        changeSlideHandler,
        setNewSlides,
    } = useContext(SliderContext)

    useEffect(() => {
        const autoplay = setInterval(() => {
            changeSlideHandler(activeIndex + 1, -100)
        }, settingTimeAutoplay);
        return () => clearInterval(autoplay);
    },)

    return (

        <div className={classes.Slider}>

            {
                (slides && slides.length > 1)
                    ?
                    <>
                        <SlideContent/>

                        <NavButton type='prev' activeIndex={activeIndex} changeSlideHandler={changeSlideHandler}/>
                        <NavButton type='next' activeIndex={activeIndex} changeSlideHandler={changeSlideHandler}/>

                        <div className={classes.navbar}>
                            <Stepper setNewSlides={setNewSlides} activeIndex={activeIndex}/>
                        </div>
                    </>
                    : <p style={{textAlign: 'center'}}>Not enough slides! Add more than 1 slide.</p>

            }

        </div>

    )
};

export default Slider;