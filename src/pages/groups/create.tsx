import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import { Button, TextField } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'block',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: "560px",
            padding: "50px 30px"
        },
    },
    label: {
        width: "100%",
        display: "block",
        margin: "0 auto 42px auto",
    },
    inputTitle: {
        fontFamily: "'Lato', sans-serif",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: "18px",
        lineHeight: "145%",
        marginBottom: '9px',
        '& span': {
            color: '#D2D5D9'
        }
    },
    cardBtn: {
        padding: '12px',
        fontFamily: "'Mulish' sans-serif",
        fontSize: "18px",
        fontWeight: "bold",
        lineHeight: "23px"
    }
}))

export default function CreateGroup() {
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Paper elevation={2}>
                <form action="" >
                    <label className={classes.label}>
                        <p className={classes.inputTitle}>Admin address</p>
                        <TextField style={{ backgroundColor: '#EFEFEF' }} fullWidth disabled id="outlined-disabled" variant="outlined" />
                    </label>
                    <label className={classes.label}>
                        <p className={classes.inputTitle}>Group name</p>
                        <TextField fullWidth id="outlined" variant="outlined" />
                    </label>
                    <label className={classes.label}>
                        <p className={classes.inputTitle}>Description <span>(optional)</span> </p>
                        <TextField fullWidth id="outlined" variant="outlined" multiline rows={5} />
                    </label>
                    <label className={classes.label}>
                        <p className={classes.inputTitle}>Link to forum <span>(optional)</span> </p>
                        <TextField fullWidth id="outlined" variant="outlined" />
                    </label>
                    <label className={classes.label}>
                        <p className={classes.inputTitle}>Text <span>(optional)</span> </p>
                        <TextField fullWidth id="outlined" variant="outlined" multiline rows={5} />
                    </label>
                    <div className={classes.label}>
                        <p className={classes.inputTitle}>Add member accounts</p>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <TextField style={{ width: '80%' }} id="outlined" variant="outlined" />
                            <Button className={classes.cardBtn} variant="outlined" color="primary" href="#outlined-buttons">
                                +Add
                            </Button>
                        </div>
                    </div>

                </form>
            </Paper>
        </div>
    )
}
