import { TableCell, TableRow } from '@material-ui/core'
import React from 'react'
import { ITableInner } from './proposal-types'

const TableInner = ({ isItemSelected, row, labelId }: ITableInner) => {
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
    )
}

export default TableInner
