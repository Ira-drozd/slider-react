import React, {useContext} from 'react';
import classes from './SlideContent.module.scss'
import SlideHeader from "./SlideHeader/SlideHeader";
import {SliderContext} from '../../../context/sliderContext'

const SlideContent = () => {
    const {
        position,
        time,
        activeSlides,
        handlerOnDown,
        handlerOnUp,

    } = useContext(SliderContext)

    const content =
        activeSlides.map((slide, index) => {
                const mainBackground = slide.image ? {backgroundImage: `url(${slide.image})`} : {background: '#000'}

                return (
                    <div
                        key={index}
                        className={classes.content}
                        style={mainBackground}
                        onMouseDown={e => handlerOnDown(e.clientX)}
                        onMouseUp={e => handlerOnUp(e.clientX)}
                        onTouchStart={e => handlerOnDown(e.targetTouches[0].clientX)}
                        onTouchEnd={e => handlerOnUp(e.changedTouches[0].clientX)}
                    >
                        {
                            slide.component
                                ? slide.component
                                : <SlideHeader header={slide.header}/>
                        }
                    </div>
                )
            }
        )

    return (
        <div className={classes.SliderContent}
             style={{
                 transform: `translateX(${position}vw)`,
                 transition: `${time}ms ease-in-out`
             }}
        >
            {content}
        </div>
    )
};

export default SlideContent;