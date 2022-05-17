import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@material-ui/core'

import React from 'react'
import { EnhancedTableProps } from './proposal-types'
import { headCells } from './constants'
import { Vote } from '../../generated/cosmos/group/v1/types'

export function EnhancedTableHead(props: EnhancedTableProps) {
    const {
        onSelectAllClick,
        order,
        orderBy,
        numSelected,
        rowCount,
        onRequestSort
    } = props

    const createSortHandler =
        (property: keyof Vote) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property)
        }

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
                            {orderBy === headCell.id ? <Box component="span"></Box> : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
