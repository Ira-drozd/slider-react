import React from 'react';
import classes from './TestSlideComponent.module.scss'

const TestSlideComponent = () => (
    <div className={classes.TestSlideComponent}>
        <p>It`s React compotent (selected in settingSlider.js)</p>
        <p>It can work with any HTML content.</p>
    </div>
);

export default TestSlideComponent;