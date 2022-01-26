import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../shared-state/repo'
import { Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core'
import { Routes } from '../../routes'
import { Link } from 'react-router-dom'

export const Groups: React.FC<{}> = observer(() => {
    const { groups, fetchGroups } = useStores().groupsStore
    useEffect(() => {
        fetchGroups()
    }, [fetchGroups])

    return (
        <div>
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
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: 700 }}>Name</TableCell>
                            <TableCell align="right" style={{ fontWeight: 700 }}>Created</TableCell>
                            <TableCell align="right" style={{ fontWeight: 700 }}>Last edited</TableCell>
                            <TableCell align="right" style={{ fontWeight: 700 }}>Description</TableCell>
                            <TableCell align="right" style={{ fontWeight: 700 }}>Number of members</TableCell>
                            <TableCell align="right" style={{ fontWeight: 700 }}>Your membership type</TableCell>
                            <TableCell />
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {groups.map(group => (
                            <TableRow key={group.info.group_id}>
                                <TableCell component="th" scope="row" style={{ fontWeight: 900 }}>
                                    { group.metadata.name }
                                </TableCell>
                                <TableCell align="right">{new Date(group.metadata.created).toISOString()}</TableCell>
                                <TableCell align="right">{new Date(group.metadata.lastEdited).toISOString()}</TableCell>
                                <TableCell align="right">{group.metadata.description}</TableCell>
                                <TableCell align="right">{(group.members || []).length}</TableCell>
                                <TableCell align="right">TODO</TableCell>
                                <TableCell align="right"><Link to={`/groups/${group.info.group_id}`}>Edit</Link></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
            <br />
            <br />
            <pre style={{ maxWidth: 400, overflowX: 'scroll' }}>
                { JSON.stringify(groups, null, 2) }
            </pre>
        </div>
    )
})
