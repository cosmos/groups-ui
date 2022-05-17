import React from 'react'
import { Box, TableHead, TableRow, TableSortLabel } from '@material-ui/core'
import { Data, EnhancedTableProps } from './groups-type'
import { headCells } from './constants'
import { StyledTableCell } from './group-styles'

export function EnhancedTableHead({
                                      order,
                                      orderBy,
                                      numSelected,
                                      rowCount,
                                      onRequestSort
                                  }: EnhancedTableProps) {
    const createSortHandler =
        (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
            onRequestSort(event, property)
        }

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        style={{ paddingLeft: '40px' }}
                        key={headCell.id}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? <Box component="span"></Box> : null}
                        </TableSortLabel>
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
