import { Box, IconButton, useTheme } from '@material-ui/core'
import { ArrowBack, ArrowForward } from '@material-ui/icons'
import React from 'react'
import { TablePaginationActionsProps } from './proposal-types'

export function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme()
    const { count, page, rowsPerPage, onPageChange } = props

    const handleFirstPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, 0)
    }

    const handleBackButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page - 1)
    }

    const handleNextButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, page + 1)
    }

    const handleLastPageButtonClick = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
    }

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                style={{
                    backgroundColor: '#3D7ACF',
                    color: 'white',
                    width: '50px',
                    height: '50px'
                }}
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <ArrowForward/> : <ArrowBack/>}
            </IconButton>
            <IconButton
                style={{ backgroundColor: '#3D7ACF', color: 'white' }}
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <ArrowBack/> : <ArrowForward/>}
            </IconButton>
        </Box>
    )
}
