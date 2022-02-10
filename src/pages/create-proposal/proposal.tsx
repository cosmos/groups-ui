import { makeStyles, Paper } from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Page } from "../page";

const useStyles = makeStyles(() => ({
    root: {
        padding: '0px 24px',
        width: '1200px',

        '& .MuiSelect-outlined': {
            backgroundColor: 'white'
        }
    },
    link: {
        display: 'inline-flex',
        fontSize: '18px',
        alignItems: 'center',
        fontFamily: " 'Lato', sans-serif ",
        marginBottom: '35px'
    },
    parChange: {
        padding: '50px 40px',
        width: '678px',
        borderRight: '1px solid #D2D5D9',
    },
    voting: {
        width: '522px',
        backgroundColor: '#FAFAFA',
        padding: '53px 43px',
        borderRadius: '0 10px 10px 0'
    },
    info: {
        display: 'flex',
        alignItems: 'center',

        '& p': {
            fontSize: '14px',
            fontWeight: 800,
            color: '#545555',
            borderRadius: '3px',
            backgroundColor: '#EFEFEF',
            padding: '5px'
        }
    }
}))

const statusStyles = makeStyles(() => ({
    marker: {
        fontFamily: " 'Lato' ",
        fontSize: '12px',
        fontWeight: 'bold',
        padding: '6px 10px',
        borderRadius: '50px',
        border: '1px solid',

        '&.green': {
            color: "#4FB573",
            borderColor: '#B9E1C7',
            backgroundColor: 'rgba(220, 240, 227, 0.2)'
        },
        '&.orange': {
            color: '#FF9110',
            borderColor: '#FFA53A',
            backgroundColor: 'rgba(255, 165, 58, 0.1)'
        }
    },
    button: {

    }
}))

export const ProposalPage: React.FC<{}> = observer(() => {

    const classes = useStyles()
    const status = statusStyles()

    return (
        <Page>
            <div className={classes.root}>
                <Link to="#" style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 800 }} className={classes.link} onClick={() => console.log('click')} >
                    <ArrowBack style={{ fontSize: '18px', marginRight: '8px' }} />
                    Foo dev team
                </Link>
                <Paper style={{ display: 'flex', borderRadius: '10px' }}>
                    <div className={classes.parChange}>
                        <div className={classes.info}>
                            <p>#5</p>
                            <span className={`${status.marker} green`} style={{ margin: '0 22px' }}>Submited</span>
                            <span className={`${status.marker} orange`}>Unfinilized</span>
                        </div>
                    </div>
                    <div className={classes.voting}>
                        <div style={{ display: 'flex', alignItems: 'baseline' }}>
                            <h2>Voting group:</h2>
                            <p>Foo Dev Team</p>
                        </div>
                    </div>
                </Paper>
            </div>
        </Page>
    )
})