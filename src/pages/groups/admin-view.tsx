import React from 'react'
import {
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
    withStyles
} from '@material-ui/core'
import { ChatBubbleOutline, Description, SettingsRounded } from '@material-ui/icons'
import { observer } from 'mobx-react-lite'
import { ReactComponent as DeligateIcon } from '../../icons/deligate.svg'
import { ReactComponent as SpendIcon } from '../../icons/spend.svg'
import { Link, useParams } from 'react-router-dom'
import { Page } from '../page'


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
        fontFamily: " 'Lato', sans-serif  ",
        '& h1': {
            fontWeight: 900,
            lineHeight: '50px'

        },
        '& .btn': {
            padding: '3px 45px',
            fontSize: '16px',
            fontWeight: 700,
        },
        '& .subtitle': {
            fontSize: '20px',
            lineHeight: '33px',
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
        fontFamily: " 'Lato', sans-serif ",
        marginBottom: '35px'
    },
    regen: {
        display: 'flex',
        alignItems: 'baseline',
        marginRight: '28px',

        '& h2': {
            fontWeight: 900
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

        '& .actionBtns': {
            marginTop: '23px',
            display: 'flex',
            justifyContent: 'space-between',
        },

        '& button': {
            fontSize: '16px',
            fontWeight: 700,
            width: '23%'
        }
    }

}))

const StyledTableCell = withStyles(() => ({
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
}))(TableCell)

const StyledTableRow = withStyles((theme) => ({
    root: {
        textAlign: 'left',
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow)

function createData(date, status, number, desc) {
    return { date, status, number, desc }
}

const rows = [
    createData('62.12.2021', 'unfinalized', `#1`, 'sometext in description'),
    createData('22.11.2021', 'unfinalized', `#2`, 'sometext in description'),
    createData('52.15.2021', 'unfinalized', `#3`, 'sometext in description'),
    createData('02.02.2021', 'unfinalized', `#4`, 'sometext in description'),
    createData('21.11.2412', 'unfinalized', `#5`, 'sometext in description'),
]

const tableStyles = makeStyles({
    table: {
        borderTop: '1px solid #EFEFEF',
        minWidth: 700,
    },
})

export const GroupAdminView: React.FC<{}> = observer(() => {
    const [age, setAge] = React.useState('')

    const pathParams: any = useParams()
    const groupId = pathParams.id === 'new' ? -1 : Number(pathParams.id)

    const handleChange = (event) => {
        setAge(event.target.value)
    }

    const classes = useStyles()
    const table = tableStyles()

    return (
        <Page>
            <div className={classes.root}>
                <div>
                    <div className={classes.heroBlock}>
                        <h1>Foo Dev Team</h1>
                        <Link to={`/groups/${groupId}/details`}>
                            <Button variant="outlined" color="primary" className="btn" style={{ backgroundColor: 'white' }}>
                                group details
                            </Button>
                        </Link>

                    </div>
                    <div className={classes.heroBlock}>
                        <p className="subtitle">This group is to manage the funds for the Foo developer team’s efforts.</p>
                        <p className={classes.date}>Created Nov 29th 2021, 12:00:35 AM</p>
                    </div>
                    <Link to="#" className={classes.link} onClick={() => console.log('click')} >
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
                        <Button variant="outlined" color="primary" className="btn">
                            <SvgIcon component={DeligateIcon} style={{ fontSize: '20px', height: '25px', marginRight: '5px' }} />
                            delegate funds
                        </Button>
                        <Button variant="outlined" color="primary" className="btn">
                            <SvgIcon component={SpendIcon} style={{ fontSize: '20px', height: '25px', marginRight: '5px' }} />
                            spend funds
                        </Button><Button variant="outlined" color="primary" className="btn">
                            <Description style={{ fontSize: '20px', marginRight: '5px' }} />
                            text proposal
                        </Button><Button variant="outlined" color="primary" className="btn">
                            <SettingsRounded style={{ fontSize: '20px', marginRight: '5px' }} />
                            custom proposal
                        </Button>
                    </div>
                </Paper>
                <Paper elevation={2}>
                    <h3 style={{ padding: '40px' }}>Proposed Actions</h3>
                    <Table className={table.table} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Date</StyledTableCell>
                                <StyledTableCell align="left">Name</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.number}>
                                    <StyledTableCell align="left" style={{ width: '30%' }}>{row.date}</StyledTableCell>
                                    <StyledTableCell align="left">{row.status}</StyledTableCell>
                                    <StyledTableCell align="left">{row.number}</StyledTableCell>
                                    <StyledTableCell align="left">{row.desc}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>

            </div>
        </Page>
    )
})
