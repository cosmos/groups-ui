import { Button, IconButton, Link, makeStyles, Paper, Table, TableBody, TableCell, TableFooter, TableHead, TablePagination, TableRow, useTheme, withStyles } from '@material-ui/core';
import { ArrowBack, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useStyles } from './admin-viev';
import PropTypes from 'prop-types';

function createPolicyData(date, window, threshold, quorum, admin) {
    return { date, window, threshold, quorum, admin };
}

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

const policyRows = [
    createPolicyData("21.22.12", '20 days', '49 / 100 (49%)', '40%', 'regencx2891203isoasper...'),
    createPolicyData("53.63.24", '15 days', '51 / 100 (51%)', '50%', 'regencx2891203isoasper...'),
    createPolicyData("45.42.12", '10 days', '50 / 100 (50%)', '30%', 'regencx2891203isoasper...'),
];

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    return (
        <div className={classes.root}>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};


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

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(4);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, memberRows.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


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
                    <h2 style={{ padding: '40px', fontWeight: 900 }}>Members</h2>
                    <Button variant='outlined' color='primary' className='tableBtn'>
                        edit group
                    </Button>
                </div>
                <Table className={table.table} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Adress</StyledTableCell>
                            <StyledTableCell align="left">voting window</StyledTableCell>
                            <StyledTableCell align="left">date added</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? memberRows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : memberRows
                        ).map((row) => (
                            <StyledTableRow key={row.date}>
                                <StyledTableCell align="left" style={{ width: '15%', padding: '28px 40px' }}>{row.adress}</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '15%', padding: '28px 40px' }}>{row.window}</StyledTableCell>
                                <StyledTableCell align="left" style={{ width: '30%', padding: '28px 40px' }}>{row.date}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            {/* <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={memberRows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            /> */}
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        </div>
    )
})