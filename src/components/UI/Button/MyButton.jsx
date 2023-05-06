import React from 'react';
import classes from "./MyButtom.module.css";

const MyButton = (props) => {
    return (
        <button {...props} className={classes.MyBtn}>
            {props.children}
        </button>
    );
};

export default MyButton;