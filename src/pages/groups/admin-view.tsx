import React from 'react'
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Paper,
    Select,
    SvgIcon,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    withStyles
} from '@material-ui/core'
import { ChatBubbleOutline, Description, SettingsRounded } from '@material-ui/icons'
import { observer } from 'mobx-react-lite'
import { ReactComponent as DeligateIcon } from '../../icons/deligate.svg'
import { ReactComponent as SpendIcon } from '../../icons/spend.svg'
import { Link, useHistory, useParams } from 'react-router-dom'
import { Page } from '../page'
import {Routes} from "../../routes";
import {statusStyles} from "../proposals/proposal";

interface Data {
    date: string;
    status: string;
    number: string;
    desc: string;
}

export const useStyles = makeStyles(() => ({
    root: {
        padding: '0px 24px',
        width: '1200px',

        '& .MuiSelect-outlined': {
            backgroundColor: 'white'
        }
    },
    heroBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '18px',
        fontFamily: ' \'Lato\', sans-serif  ',
        '& h1': {
            fontWeight: 900,
            lineHeight: '50px',
            fontSize: '38px'
        },
        '& .btn': {
            padding: '9px 45px',
            fontSize: '18px',
            fontWeight: 800,
            backgroundColor: 'white',
            lineHeight: '23px'
        },
        '& .subtitle': {
            fontSize: '22px',
            lineHeight: '150%',
            fontWeight: 400,
            color: '#545555'
        },

        '& .tableBtn': {
            padding: '12px 45px',
            fontSize: '16px',
            fontWeight: 700,
            marginRight: '40px'
        }
    },
    date: {
        fontSize: '14px',
        lineHeight: '24px',
        color: '#545555'
    },
    link: {
        display: 'inline-flex',
        fontSize: '18px',
        alignItems: 'center',
        fontFamily: ' \'Lato\', sans-serif ',
        marginBottom: '35px',
        color: '#3D7ACF'
    },
    regen: {
        display: 'flex',
        alignItems: 'baseline',
        marginRight: '28px',

        '& h2': {
            fontWeight: 900,
            fontSize: '32px',
            lineHeight: '140%'
        },
        '& p': {
            fontSize: '12px',
            fontWeight: 700,
            textTransform: 'uppercase',
            margin: '0 7px'
        },
        '& span': {
            fontSize: '16px',
            color: '#545555'
        }
    },

    actions: {
        padding: '40px',
        margin: '30px 0',

        '& h3': {
            fontSize: '24px',
            fontWeight: 900,
            lineHeight: '145%'
        },

        '& .actionBtns': {
            marginTop: '23px',
            display: 'flex',
            justifyContent: 'space-between'
        },

        '& button': {
            fontSize: '16px',
            fontWeight: 700,
            width: '23%',

            '& .MuiButton-label': {
                padding: '0',
                fontSize: '18px'
            }
        },

        '& .icon': {
            fontSize: '20px',
            marginRight: '5px',
            height: '25px'
        }
    },
    proposedActions: {
        '& h3': {
            padding: '40px',
            fontSize: '24px',
            fontWeight: 900,
            lineHeight: '145%'
        },
        '& .number': {
            padding: '7px',
            borderRadius: '3px',
            fontFamily: 'Mulish',
            backgroundColor: '#EFEFEF',
            fontWeight: 800,
            fontSize: '14px',
            lineHeight: '18px',
            letterSpacing: '1px',
            color: '#545555'
        },
        '& .description': {
            fontFamily: 'Lato',
            fontWeight: 700,
            fontSize: '18px',
            lineHeight: '145%',
            /* or 26px */
            color: '#202020'
        }
    },

    editGroupBtn: {
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
        padding: '10px 25px'
    },
}))

function createData(
    date: string,
    status: string,
    number: string,
    desc: string,
): Data {
    return {
        date, status, number, desc
    };
}

const StyledTableCell = withStyles(() => ({
    head: {
        padding: '23px 40px',
        fontSize: '12px',
        fontWeight: 800,
        textTransform: 'uppercase',
        fontFamily: ' \'Mulish\', sans-serif '
    },
    body: {
        padding: '48px 40px',
        fontSize: '16px'
    }
}))(TableCell)

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
        id: 'date',
        numeric: false,
        disablePadding: true,
        label: 'date',
    },
    {
        id: 'status',
        numeric: true,
        disablePadding: false,
        label: 'name',
    },
    {
        id: 'number',
        numeric: true,
        disablePadding: false,
        label: '',
    },
    {
        id: 'desc',
        numeric: true,
        disablePadding: false,
        label: '',
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
                    <StyledTableCell
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span">

                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const StyledTableRow = withStyles((theme) => ({
    root: {
        textAlign: 'left',
        '&:nth-of-type(odd)': {
            backgroundColor: '#FAFAFA'//theme.palette.action.hover
        }
    }
}))(TableRow)

const rows = [
    createData('62.12.2021', 'unfinalized', `#1`, 'sometext in description'),
    createData('22.11.2021', 'unfinalized', `#2`, 'sometext in description'),
    createData('52.15.2021', 'unfinalized', `#3`, 'sometext in description'),
    createData('02.02.2021', 'unfinalized', `#4`, 'sometext in description'),
    createData('21.11.2412', 'unfinalized', `#5`, 'sometext in description')
]

const tableStyles = makeStyles({
    table: {
        borderTop: '1px solid #EFEFEF',
        minWidth: 700
    }
})

export const GroupAdminView: React.FC<{}> = observer(() => {
    const [age, setAge] = React.useState('')
    const history = useHistory()

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof Data>('date');
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
            const newSelecteds = rows.map((n) => n.desc);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const pathParams: any = useParams()
    const groupId = pathParams.id === 'new' ? -1 : Number(pathParams.id)

    const handleChange = (event) => {
        setAge(event.target.value)
    }

    const classes = useStyles()
    const table = tableStyles()
    const status = statusStyles()

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Page>
            <div className={classes.root}>
                <div>
                    <div className={classes.heroBlock}>
                        <h1>Foo Dev Team</h1>
                        <Link to={`/groups/${groupId}/details`}>
                            <Button variant="outlined" color="primary" className="btn">
                                group details
                            </Button>
                        </Link>

                    </div>
                    <div className={classes.heroBlock}>
                        <p className="subtitle">This group is to manage the funds for the Foo developer team’s
                            efforts.</p>
                        <p className={classes.date}>Created Nov 29th 2021, 12:00:35 AM</p>
                    </div>
                    <Link to="#" className={classes.link} onClick={() => console.log('click')}>
                        <ChatBubbleOutline style={{ fontSize: '18px', marginRight: '8px' }} />
                        View discussion on group forum»
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div className={classes.regen}>
                            <h2>1,200</h2>
                            <p>regen</p>
                            <span>($2,117 USD)</span>
                        </div>
                        <FormControl variant="outlined" style={{ width: '30%' }}>
                            <InputLabel id="demo-simple-select-outlined-label" />
                            <Select
                                id="demo-simple-select-outlined"
                                value={age}
                                onChange={handleChange}
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <Paper elevation={2} className={classes.actions}>
                    <h3>Actions</h3>
                    <div className="actionBtns">
                        <Button
                            variant="outlined"
                            color="primary"
                            className="btn"
                            onClick={() => history.push(Routes.PROPOSALS_NEW_STAKE.replace(':id', groupId.toString()))}
                        >
                            <SvgIcon component={DeligateIcon} className="icon"/>
                            stake
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            className="btn"
                            onClick={() => history.push(Routes.PROPOSALS_NEW_SPEND.replace(':id', groupId.toString()))}
                        >
                            <SvgIcon component={SpendIcon} className="icon"/>
                            spend funds
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            className="btn"
                            onClick={() => history.push(Routes.PROPOSALS_NEW_TEXT.replace(':id', groupId.toString()))}
                        >
                            <Description style={{ fontSize: '20px', marginRight: '5px' }} />
                            text proposal
                        </Button>
                        <Button
                            variant="outlined"
                            color="primary"
                            className="btn"
                            onClick={() => history.push(Routes.PROPOSALS_NEW_CUSTOM.replace(':id', groupId.toString()))}
                        >
                            <SettingsRounded style={{ fontSize: '20px', marginRight: '5px' }} />
                            custom proposal
                        </Button>
                    </div>
                </Paper>
                <Paper elevation={2} className={classes.proposedActions}>
                    <h3>Proposed Actions</h3>
                    <Table className={table.table} aria-label="customized table">
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
                                    // const isItemSelected = isSelected(row.date);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <StyledTableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.date}
                                        >
                                            <StyledTableCell
                                                align="left"
                                                style={{ width: '30%' }}
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.date}
                                            </StyledTableCell>
                                            <StyledTableCell align="left"><span className={`${status.marker} orange`}>{row.status}</span></StyledTableCell>
                                            <StyledTableCell align="left"><span className="number">{row.number}</span></StyledTableCell>
                                            <StyledTableCell align="left"><span className="description">{row.desc}</span></StyledTableCell>
                                        </StyledTableRow>
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
                        {/* <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.number}>
                                    <StyledTableCell align="left" style={{ width: '30%' }}>{row.date}</StyledTableCell>
                                    <StyledTableCell align="left"><span className={`${status.marker} orange`}>{row.status}</span></StyledTableCell>
                                    <StyledTableCell align="left">{row.number}</StyledTableCell>
                                    <StyledTableCell align="left">{row.desc}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody> */}
                    </Table>
                </Paper>

            </div>
        </Page>
    )
})
