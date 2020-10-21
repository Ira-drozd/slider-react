import React, {useContext} from 'react';
import classes from './SlideContent.module.scss'
import ContextSlider from "../../context";
import SlideHeader from "./SlideHeader/SlideHeader";

const SlideContent = (props) => {
    const {
        position,
        time,
        activeSlides,
        handlerOnDown,
        handlerOnUp,

    } = useContext(ContextSlider)


    return (
        <div className={classes.SliderContent}
             style={{
                 transform: `translateX(${position}vw)`,
                 transition: `${time}ms ease-in-out`
             }}
        >
            {
                activeSlides.map((slide, index) =>
                    <div
                        key={index}
                        className={classes.content}
                        style={{
                            backgroundImage: `url(${slide.image})`
                        }}
                        onMouseDown={e => handlerOnDown(e.clientX)}
                        onMouseUp={e => handlerOnUp(e.clientX)}
                        onTouchStart={e => handlerOnDown(e.targetTouches[0].clientX)}
                        onTouchEnd={e => handlerOnUp(e.changedTouches[0].clientX)}
                    >

                        <SlideHeader header={slide.header}/>
                    </div>
                )
            }

        </div>
    )
};

export default SlideContent;