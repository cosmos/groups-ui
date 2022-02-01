import { Button, Link, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow, withStyles } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStyles } from './admin-viev';

function createPolicyData(date, window, threshold, quorum, admin) {
    return { date, window, threshold, quorum, admin };
}

const policyRows = [
    createPolicyData("21.22.12", '20 days', '49 / 100 (49%)', '40%', 'regencx2891203isoasper...'),
    createPolicyData("53.63.24", '15 days', '51 / 100 (51%)', '50%', 'regencx2891203isoasper...'),
    createPolicyData("45.42.12", '10 days', '50 / 100 (50%)', '30%', 'regencx2891203isoasper...'),
];

function createMemberData(adress, window, date) {
    return { adress, window, date }
}

const memberRows = [
    createMemberData('regencx2891203isoasper...', '1', '23.01.21'),
    createMemberData('regencx2891203isoasper...', '1', '12.01.21'),
    createMemberData('regencx2891203isoasper...', '1', '05.01.21'),
];

const StyledTableCell = withStyles((theme) => ({
    head: {
        padding: '23px 40px',
        fontSize: '12px',
        fontWeight: 800,
        textTransform: 'uppercase',
        fontFamily: " 'Mulish', sans-serif "
    },
    body: {
        padding: '48px 40px',
        fontSize: '16px',
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        textAlign: 'left',
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const tableStyles = makeStyles({
    table: {
        borderTop: '1px solid #EFEFEF',
        minWidth: 700,
    },
});


export const GroupDetails: React.FC<{}> = observer(() => {
    const classes = useStyles();
    const table = tableStyles();


    return (
        <div className={classes.root}>
            <div>
                <Link href="#" style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 800 }} className={classes.link} onClick={() => console.log('click')} >
                    <ArrowBack style={{ fontSize: '18px', marginRight: '8px' }} />
                    Foo dev team
                </Link>
                <div className={classes.heroBlock}>
                    <h1>Group Details</h1>
                    <Button variant="contained" color="primary" className='btn'>
                        edit group
                    </Button>
                </div>
                <div className={classes.heroBlock}>
                    <p className='subtitle'>This group is to manage the funds for the Foo developer team’s efforts.</p>
                </div>
                <div className={classes.regen}>
                    <p style={{ marginLeft: '0' }}>group admin</p>
                    <Link href="#" className={classes.link} onClick={() => console.log('click')} >
                        regenj1isa90182095dser...
                    </Link>
                </div>
            </div>
            <Paper elevation={2}>
                <h2 style={{ padding: '40px', fontWeight: 900 }}>Group Policy</h2>
                <Table className={table.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell align="left">voting window</StyledTableCell>
                            <StyledTableCell align="left">threshold</StyledTableCell>
                            <StyledTableCell align="left">quorum</StyledTableCell>
                            <StyledTableCell align="left">admin</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {policyRows.map((row) => (
                            <StyledTableRow key={row.date}>
                                <StyledTableCell align="left">{row.date}</StyledTableCell>
                                <StyledTableCell align="left">{row.window}</StyledTableCell>
                                <StyledTableCell align="left">{row.threshold}</StyledTableCell>
                                <StyledTableCell align="left">{row.quorum}</StyledTableCell>
                                <StyledTableCell align="left">{row.admin}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <Paper elevation={2} style={{ marginTop: '21px' }}>
                <div className={classes.heroBlock}>
                    <h2 style={{ padding: '40px', fontWeight: 900 }}>Group Policy</h2>
                    <Button variant='outlined' color='primary' className='tableBtn'>
                        edit group
                    </Button>
                </div>
                <Table className={table.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Adress</StyledTableCell>
                            <StyledTableCell align="left">voting window</StyledTableCell>
                            <StyledTableCell align="left">date</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {memberRows.map((row) => (
                            <StyledTableRow key={row.date}>
                                <StyledTableCell align="left" style={{ width: '15%', padding: '28px 40px' }}>{row.adress}</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '15%', padding: '28px 40px' }}>{row.window}</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '30%', padding: '28px 40px' }}>{row.date}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    )
})