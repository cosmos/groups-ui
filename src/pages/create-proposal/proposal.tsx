import { alpha, Box, Button, Checkbox, FormControlLabel, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, TableSortLabel, TextField, Toolbar, Tooltip, Typography, useTheme } from "@material-ui/core";
import { ArrowBack, ArrowForward, ChatBubbleOutline, Check, Close, Delete, FilterList, ThumbDown } from "@material-ui/icons";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link, Switch } from "react-router-dom";
import { Page } from "../page";
interface Data {
    calories: number;
    carbs: number;
    fat: number;
    name: string;
}

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement>,
        newPage: number,
    ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>,
    ) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                style={{ backgroundColor: '#3D7ACF', color: 'white', width: '50px', height: '50px' }}
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <ArrowForward /> : <ArrowBack />}
            </IconButton>
            <IconButton
                style={{ backgroundColor: '#3D7ACF', color: 'white' }}
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <ArrowBack /> : <ArrowForward />}
            </IconButton>
        </Box>
    );
}


function createData(
    name: string,
    calories: number,
    fat: number,
    carbs: number,
): Data {
    return {
        name,
        calories,
        fat,
        carbs,
    };
}

const rows = [
    createData('Cupcake', 305, 3.7, 67),
    createData('Donut', 452, 25.0, 51),
    createData('Eclair', 262, 16.0, 24),
    createData('Frozen yoghurt', 159, 6.0, 24),
    createData('Gingerbread', 356, 16.0, 49),
    createData('Honeycomb', 408, 3.2, 87),
    createData('Ice cream sandwich', 237, 9.0, 37),
    createData('Jelly Bean', 375, 0.0, 94),
    createData('KitKat', 518, 26.0, 65),
    createData('Lollipop', 392, 0.2, 98),
    createData('Marshmallow', 318, 0, 81),
    createData('Nougat', 360, 19.0, 9,),
    createData('Oreo', 437, 18.0, 63),
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (
        a: { [key in Key]: number | string },
        b: { [key in Key]: number | string },
    ) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'name',
        numeric: false,
        disablePadding: true,
        label: 'vote option',
    },
    {
        id: 'calories',
        numeric: true,
        disablePadding: false,
        label: 'status',
    },
    {
        id: 'fat',
        numeric: true,
        disablePadding: false,
        label: 'voting power',
    },
    {
        id: 'carbs',
        numeric: true,
        disablePadding: false,
        label: 'adress',
    },
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
        props;
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        style={{ paddingLeft: '40px' }}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            <h5>{headCell.label}</h5>
                            {orderBy === headCell.id ? (
                                <Box component="span">

                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

interface EnhancedTableToolbarProps {
    numSelected: number;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
    const { numSelected } = props;

    return (
        <Toolbar>
            {numSelected > 0 ? (
                <Typography
                    style={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    style={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    <h2>Votes</h2>
                </Typography>
            )}
            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton>
                        <Delete />
                    </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Filter list">
                    <IconButton>
                        <FilterList />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};


const useStyles = makeStyles(() => ({
    root: {
        padding: '0px 24px',
        width: '1200px',

        '& .MuiSelect-outlined': {
            backgroundColor: 'white'
        },
        '& h1,h2,h3,h4,h5': {
            fontWeight: 900,
        },
        '& h1': {
            fontSize: '32px',
            lineHeight: '44px'
        },
        '& h2': {
            fontSize: '24px',
            lineHeight: '34px'
        },
        '& h3': {
            fontSize: '21px',
            lineHeight: '31px'
        },
        '& h4': {
            fontSize: '14px',
            lineHeight: '17px',
            textTransform: 'uppercase'
        },
        '& h5': {
            fontSize: '12px',
            lineHeight: '15px',
            textTransform: 'uppercase'
        },

        '& .text': {
            fontWeight: 400,
            fontSize: '14px',
            fontFamily: " 'Lato' ",
            lineHeight: '24px',
            color: '#545555'
        }
    },
    grayBlock: {
        backgroundColor: '#FAFAFA',
        border: '1px solid #EFEFEF',
        borderRadius: '5px',
        padding: '34px 20px',
        margin: '30px 0',

        '& .values': {
            display: 'flex',
            justifyContent: 'space-between',
            textAlign: 'left',
            margin: '25px 0'
        }
    },
    link: {
        display: 'inline-flex',
        fontSize: '18px',
        alignItems: 'center',
        fontFamily: " 'Lato', sans-serif ",
        marginBottom: '35px',

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
    btnBox: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
    },
    info: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '30px',

        '& p': {
            fontSize: '14px',
            fontWeight: 800,
            color: '#545555',
            borderRadius: '3px',
            backgroundColor: '#EFEFEF',
            padding: '5px'
        }
    },

    propDetails: {
        width: '50%',

        '& h4': {
            marginBottom: '9px'
        },
        '& p': {
            marginBottom: '28px'
        }
    },
    content: {
        width: '50%',

        '& h4': {
            marginBottom: '26px'
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
        border: '1.5px solid',
        width: '172px',
        fontWeight: 800,
        fontSize: '14px',
        textAlign: 'center',

        '&.green': {
            color: '#4FB573',
            borderColor: '#4FB573',

            '&:hover': {
                backgroundColor: '#4FB573',
                color: 'white'
            }
        },
        '&.orange': {
            color: '#FF9110',
            borderColor: '#FF9110',

            '&:hover': {
                backgroundColor: '#FF9110',
                color: 'white'
            }
        },
        '&.yellow': {
            color: '#FFC432',
            borderColor: '#FFC432',

            '&:hover': {
                backgroundColor: '#FFC432',
                color: 'white'
            }
        },
        '&.red': {
            color: '#DE4526',
            borderColor: '#DE4526',

            '&:hover': {
                backgroundColor: '#DE4526',
                color: 'white'
            }
        },

    }
}))

export const ProposalPage: React.FC<{}> = observer(() => {

    const classes = useStyles()
    const status = statusStyles()
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Data,
    ) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, name: any) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    const isSelected = (name: any) => selected.indexOf(name) !== -1;

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Page>
            <div className={classes.root}>
                <Link to="#" style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 800 }} className={classes.link} onClick={() => console.log('click')} >
                    <ArrowBack style={{ fontSize: '18px', marginRight: '8px' }} />
                    Foo dev team
                </Link>
                <Paper style={{ display: 'flex', borderRadius: '10px', marginBottom: '20px' }}>
                    <div className={classes.parChange}>
                        <div className={classes.info}>
                            <p>#5</p>
                            <span className={`${status.marker} green`} style={{ margin: '0 22px' }}>Submited</span>
                            <span className={`${status.marker} orange`}>Unfinilized</span>
                        </div>
                        <div>
                            <h1 style={{ marginBottom: '25px' }}>Parameter Change Proposal</h1>
                            <p className="text" style={{ fontSize: '18px' }}>MaxValidators=50 to MaxValidators=75 / This proposal will increase the number of active validator to 75 in the regen network. <br /> <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className={classes.grayBlock}>
                            <h3>Parameter change</h3>
                            <div className="values">
                                <div>
                                    <h4 style={{ marginBottom: '10px' }}>Old value</h4>
                                    <p className="text" style={{ backgroundColor: '#F8DAD4', width: '30px', textAlign: 'center' }}>50</p>
                                </div>
                                <div style={{ marginRight: '190px' }}>
                                    <h4 style={{ marginBottom: '10px' }}>New value</h4>
                                    <p className="text" style={{ backgroundColor: '#DCF0E3', width: '30px', textAlign: 'center' }}>75</p>
                                </div>
                            </div>
                            <div className="values">
                                <div>
                                    <h4 style={{ marginBottom: '10px' }}>key</h4>
                                    <p className="text">MaxValidators</p>
                                </div>
                                <div style={{ marginRight: '200px' }}>
                                    <h4 style={{ marginBottom: '10px' }}>subspace</h4>
                                    <p className="text">Staking</p>
                                </div>
                            </div>
                        </div>
                        <Link to="#" className={classes.link} onClick={() => console.log('click')}>
                            <ChatBubbleOutline style={{ fontSize: '18px', marginRight: '8px' }} />
                            View discussion on group forum»
                        </Link>
                    </div>
                    <div className={classes.voting}>
                        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '35px' }}>
                            <h3>Voting group:</h3>
                            <p style={{ marginLeft: '10px' }}>Foo Dev Team</p>
                        </div>
                        <p style={{ marginBottom: '30px' }}>Voting closes Nov 29zth 2021, 12:00:35 AM</p>
                        <div style={{ width: '100%' }}>
                            <div className={classes.btnBox}>
                                <Button variant="outlined" className={`${status.button} green`}>
                                    <Check style={{ fontSize: '20px', marginRight: '5px' }} />
                                    Vote Yes
                                </Button>
                                <Button variant="outlined" className={`${status.button} red`}>
                                    <Close style={{ fontSize: '20px', marginRight: '5px' }} />
                                    Vote No
                                </Button>
                            </div>
                            <div className={classes.btnBox}>
                                <Button variant="outlined" className={`${status.button} yellow`}>

                                    Abstain
                                </Button>
                                <Button variant="outlined" className={`${status.button} orange`}>
                                    <ThumbDown style={{ fontSize: '20px', marginRight: '5px' }} />
                                    veto
                                </Button>
                            </div>
                        </div>
                    </div>
                </Paper>
                <Paper style={{ borderRadius: '10px', padding: '45px 40px', marginBottom: '20px' }}>
                    <h2>Proposal Details</h2>
                    <div style={{ display: 'flex', marginTop: '55px' }}>
                        <div className={classes.propDetails}>
                            <h4>Proposer</h4>
                            <p className="text">regen1gjvu75cq6qxyrtdv66lx9xe92jw9gqdeh64c6g...</p>
                            <h4>height</h4>
                            <p className="text">1,361,617</p>
                            <h4>Submit Time</h4>
                            <p className="text">14 days ago (Oct 29th 2021 11:43:32 AM )</p>
                            <h4>Voting Start Time</h4>
                            <p className="text">12 days ago (Oct 29th 2021 12:00:35 AM )</p>
                            <h4>Voting End Time</h4>
                            <p className="text">in 2 days (Nov 29th 2021 12:00:35 AM )</p>
                        </div>
                        <div className={classes.content}>
                            <h4>content</h4>
                            <TextField
                                style={{
                                    backgroundColor: '#FAFAFA',
                                    padding: '12px'
                                }}
                                fullWidth
                                multiline
                                rows={15}
                            />
                        </div>
                    </div>
                </Paper>
                <Box style={{ width: '100%' }}>
                    <Paper style={{ width: '100%', marginBottom: '2px' }}>
                        <EnhancedTableToolbar numSelected={selected.length} />
                        <TableContainer>
                            <Table
                                style={{ minWidth: 750 }}
                                aria-labelledby="tableTitle"
                                size={dense ? 'small' : 'medium'}
                            >
                                <EnhancedTableHead
                                    numSelected={selected.length}
                                    order={order}
                                    orderBy={orderBy}
                                    onSelectAllClick={handleSelectAllClick}
                                    onRequestSort={handleRequestSort}
                                    rowCount={rows.length}
                                />
                                <TableBody>
                                    {stableSort(rows, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.name);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                    hover
                                                    role="checkbox"
                                                    aria-checked={isItemSelected}
                                                    tabIndex={-1}
                                                    key={row.name}
                                                    selected={isItemSelected}
                                                >
                                                    <TableCell
                                                        style={{ padding: '20px 0 20px 40px' }}
                                                        component="th"
                                                        id={labelId}
                                                        scope="row"
                                                        padding="none"
                                                    >
                                                        {row.name}
                                                    </TableCell>
                                                    <TableCell align="right">{row.calories}</TableCell>
                                                    <TableCell align="right">{row.fat}</TableCell>
                                                    <TableCell align="right">{row.carbs}</TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows,
                                            }}
                                        >
                                            <TableCell colSpan={6} />
                                        </TableRow>
                                    )}
                                </TableBody>
                                <TableFooter style={{ height: '130px' }}>
                                    <TableRow>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                            colSpan={3}
                                            count={rows.length}
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            SelectProps={{
                                                inputProps: {
                                                    'aria-label': 'rows per page',
                                                },
                                                native: true,
                                            }}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                            ActionsComponent={TablePaginationActions}
                                        />
                                    </TableRow>
                                </TableFooter>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </div>

        </Page>
    )
})