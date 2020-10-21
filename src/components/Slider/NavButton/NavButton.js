import React from 'react';
import classes from './NavButton.module.scss'

const NavButton = ({type, changeSlideHandler, activeIndex}) => {
    const cls = [classes.NavButton]
    let content = ''
    const direction = {
        newIndex: 0,
        position: 0
    }

    if (type) {
        cls.push(classes[type])

        if (type === 'next') {
            content = '>'
            direction.newIndex = activeIndex + 1
            direction.position = -100
        }
        if (type === 'prev') {
            content = '<'
            direction.newIndex = activeIndex - 1
            direction.position = 100
        }
    }

    return (
        <div
            className={cls.join(' ')}
            onClick={() => changeSlideHandler(direction.newIndex, direction.position)}
        >
            {content}
        </div>
    )
};

export default NavButton;