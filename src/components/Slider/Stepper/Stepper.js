import React from 'react';
import classes from './Stepper.module.scss'
import {slides} from "../../settingsSlider";

const Stepper = ({activeIndex, setNewSlides}) => {

    const content = slides.map((point, index) => {
            const cls = [classes.point]

            if (activeIndex === index) {
                cls.push(classes.active)
            }

            return (
                <div
                    className={cls.join(' ')}
                    key={index}
                    onClick={() => setNewSlides(index)}
                >
                </div>
            )
        }
    )

    return (
        <div className={classes.Stepper}>
            {content}
        </div>
    )
};

export default Stepper;