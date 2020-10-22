import Slide1 from '../slides/ImageSlides/1.jpg'
import Slide2 from '../slides/ImageSlides/2.jpg'
import Slide3 from '../slides/ImageSlides/3.jpg'
import Slide4 from '../slides/ImageSlides/4.jpg'
import Slide5 from '../slides/ImageSlides/5.jpg'
import React from "react";
import TestSlideComponent from "../slides/TestSlideComponent/TestSlideComponent";

export const settingTimeTransition = 500

export const settingTimeAutoplay = 2500 + settingTimeTransition

export const slides = [
    {
        header: 'Slide1',
        image: Slide1
    },
    {
        header: 'Slide 2',
        image: Slide2
    }, {
        header: 'Slide 3',
        image: Slide3
    },
    {
        header: 'Slide 4',
        image: Slide4
    },
    {
        image: Slide5,
        component: <TestSlideComponent/>
    },
    {
        header: 'Slide 6 — default (no params in setting)',
    }
]