import React from 'react';
import classes from './SlideHeader.module.scss'

const SlideHeader = ({header}) => (
    <div className={classes.SlideHeader}>
        {header}
    </div>
);

export default SlideHeader;