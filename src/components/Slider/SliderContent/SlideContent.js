import React, {useContext} from 'react';
import classes from './SlideContent.module.scss'
import SlideHeader from "./SlideHeader/SlideHeader";
import {SliderContext} from '../../../context/sliderContext'

const SlideContent = (props) => {
    const {
        position,
        time,
        activeSlides,
        handlerOnDown,
        handlerOnUp,

    } = useContext(SliderContext)

    const content =
        activeSlides.map((slide, index) => {

                let mainBackground = {
                    background: '#000'
                }
                if (slide.image) {
                    mainBackground = {
                        backgroundImage: `url(${slide.image})`
                    }
                }
                if (slide.background) {
                    mainBackground = {
                        background: slide.background
                    }
                }


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
                            slide.header
                            ?<SlideHeader header={slide.header}/>
                            :null
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
            {
                content
            }

        </div>
    )
};

export default SlideContent;