import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../shared-state/repo'
import { Button, makeStyles, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Routes } from '../../routes'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    tableHead: {

        '& th': {
            padding: '0',
            border: 'none',
            fontWeight: 800,
            textAlign: 'left',
            fontFamily: " 'Mulish' ",
            fontSize: '12px',
        }
    },

    tableRow: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '20px 40px',
        alignItems: "center"
    },

    nameCol: {
        width: '30%',
    },

    col: {
        width: '20%'
    },

    tableItem: {
        padding: '48px 40px',
        transition: 'background-color .4s',

        '&:hover': {
            backgroundColor: '#FAFAFA',
            transition: 'background-color .4s'
        }
    }
}))

export const Groups: React.FC<{}> = observer(() => {
    const { groups, fetchGroups } = useStores().groupsStore
    useEffect(() => {
        fetchGroups()
    }, [fetchGroups])

    const tableStyle = useStyles();

    return (
        <div style={{ width: '1140px' }}>
            <div style={{
                marginTop: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <div style={{
                    fontWeight: 900,
                    fontSize: '38px',
                }}>
                    Groups
                </div>
                <Link to="/groups/new">
                    <Button
                        variant="contained"
                        color="primary"
                    >
                        {'Create group'}
                    </Button>
                </Link>
            </div>

            <Paper style={{
                marginTop: '48px',
            }}>
                <Table>
                    <TableHead className={tableStyle.tableHead}>
                        <TableRow className={tableStyle.tableRow}>
                            <TableCell className={tableStyle.nameCol}>Name</TableCell>
                            <TableCell className={tableStyle.col}>Created</TableCell>
                            <TableCell className={tableStyle.col}>Last edited</TableCell>
                            {/* <TableCell className={tableStyle.col}>Description</TableCell> */}
                            <TableCell className={tableStyle.col}>Number of <br /> members</TableCell>
                            <TableCell className={tableStyle.col}>Your <br /> membership type</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groups.map(group => (
                            <TableRow key={group.info.group_id} className={tableStyle.tableItem}>
                                <TableCell component="th" scope="row" className={tableStyle.nameCol} style={{ fontWeight: 900, fontSize: '18px' }}>
                                    {group.metadata.name}
                                </TableCell>
                                <TableCell className={tableStyle.col} style={{ fontSize: '16px', fontFamily: " 'Lato' " }}>{new Date(group.metadata.created).toISOString()}</TableCell>
                                <TableCell className={tableStyle.col} style={{ fontSize: '16px', fontFamily: " 'Lato' " }}>{new Date(group.metadata.lastEdited).toISOString()}</TableCell>
                                {/* <TableCell align="right">{group.metadata.description}</TableCell> */}
                                <TableCell className={tableStyle.col} style={{ fontSize: '16px', fontFamily: " 'Lato' " }}>{(group.members || []).length}</TableCell>
                                <TableCell className={tableStyle.col} style={{ fontSize: '16px', fontFamily: " 'Lato' " }}>TODO</TableCell>
                                <TableCell className={tableStyle.col} style={{ fontSize: '16px', fontFamily: " 'Lato' " }}><Link to={`/groups/${group.info.group_id}`}>Edit</Link></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <br />
            <br />
            <pre style={{ maxWidth: 400, overflowX: 'scroll' }}>
                {JSON.stringify(groups, null, 2)}
            </pre>
        </div>
    )
})
