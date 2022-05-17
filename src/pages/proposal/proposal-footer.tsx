import { TableFooter, TableRow } from '@material-ui/core'
import React from 'react'
import Pagination from '@material-ui/lab/Pagination'

const ProposalFooter = () => {
    return (
        <TableFooter style={{ height: '90px' }}>
            <TableRow>
                <Pagination
                    count={10}
                    color="primary"
                    style={{
                        width: '230%',
                        marginTop: '25px',
                        display: 'flex',
                        justifyContent: 'flex-end'
                    }}
                />
            </TableRow>
        </TableFooter>
    )
}

export default ProposalFooter
