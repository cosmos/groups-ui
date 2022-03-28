import {Button, makeStyles} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
    primaryButton: {
        minWidth: '254px',
        height: '50px',
        background: '#3D7ACF',
        borderRadius: '2px',
        fontFamily: 'Mulish',
        fontStyle: 'normal',
        fontWeight: 800,
        fontSize: '18px',
        lineHeight: '23px',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        color: '#FFFFFF',
        padding: '3px 25px'
    }
}))

export const PrimaryButton: React.FC<{onClick?: () => void}> = ({onClick, children}) => {
    const classes = useStyles()
    return (
        <Button
            className={classes.primaryButton}
            variant="contained"
            color="primary"
            onClick={() => onClick && onClick()}
        >
            {children}
        </Button>
    )
}
