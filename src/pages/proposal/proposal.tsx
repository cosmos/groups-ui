import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@material-ui/core'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Chart, registerables } from 'chart.js'

import { Page } from '../page'
import { useStyles } from './proposal-style'
import { Order } from './proposal-types'
import { getComparator, stableSort } from './utils'
import { EnhancedTableHead } from './enhanced-table-head'
import { EnhancedTableToolbar } from './enhanced-table-toolbar'
import ProposalContent from './proposal-content'
import ProposalFooter from './proposal-footer'
import TableInner from './table-inner'
import { useParams } from 'react-router-dom'
import { useStores } from '../../shared-state/repo'
import { Vote } from '../../generated/cosmos/group/v1/types'

Chart.register(...registerables)
// Chart.register(ArcElement);
// Chart.register(Doughnut);

export const ProposalPage: React.FC = observer(() => {
    const classes = useStyles()
    const [order, setOrder] = React.useState<Order>('asc')
    const [orderBy, setOrderBy] = React.useState<keyof Vote>('voter')
    const [selected, setSelected] = React.useState<readonly string[]>([])
    const [votes, setVotes] = React.useState<readonly Vote[]>([])
    const [page, setPage] = React.useState(0)
    const [dense, _] = React.useState(false)
    const [rowsPerPage, setRowsPerPage] = React.useState(5)
    const pathParams: { id?: string, group_id?: string } = useParams()
    const { fetchVotes } = useStores().proposalsStore

    useEffect(() => {
        fetchVotes(Number(pathParams.id)).then(votes => setVotes(votes))
    }, [])

    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property: keyof Vote
    ) => {
        const isAsc = orderBy === property && order === 'asc'
        setOrder(isAsc ? 'desc' : 'asc')
        setOrderBy(property)
    }

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = votes.map((n) => n.voter)
            setSelected(newSelecteds)
            return
        }
        setSelected([])
    }

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage)
    }

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10))
        setPage(0)
    }

    const isSelected = (name: any) => selected.indexOf(name) !== -1

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - votes.length) : 0

    return (
        <Page>
            <div className={classes.root}>
                <ProposalContent proposalId={Number(pathParams.id)} groupId={Number(pathParams.group_id)}/>
                <Box style={{ width: '100%' }}>
                    <Paper style={{ width: '100%', marginBottom: '2px' }}>
                        <EnhancedTableToolbar numSelected={selected.length}/>
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
                                    rowCount={votes.length}
                                />
                                <TableBody>
                                    {stableSort(votes, getComparator(order, orderBy))
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, index) => {
                                            const isItemSelected = isSelected(row.voter)
                                            const labelId = `enhanced-table-checkbox-${index}`
                                            return (
                                                <TableInner
                                                    isItemSelected={isItemSelected}
                                                    labelId={labelId}
                                                    key={labelId}
                                                    row={row}
                                                />
                                            )
                                        })}
                                    {emptyRows > 0 && (
                                        <TableRow
                                            style={{
                                                height: (dense ? 33 : 53) * emptyRows
                                            }}
                                        >
                                            <TableCell colSpan={6}/>
                                        </TableRow>
                                    )}
                                </TableBody>
                                <ProposalFooter/>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            </div>
        </Page>
    )
})
