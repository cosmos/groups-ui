import React from 'react'
import { Paper, Table, TableBody, TableHead, TableRow } from '@material-ui/core'
import { ArrowBack } from '@material-ui/icons'
import { useStyles } from './admin-view'
import { Link } from 'react-router-dom'
import { Routes } from '../../routes'
import { PrimaryButton } from '../../components/primary-button'
import { truncateAddress } from '../../utils'
import { StyledTableCell, StyledTableRow, useTableStyles } from './group-styles'

const GroupPolicyHeader = ({ editedGroup, groupId }) => {
    const tablesStyles = useTableStyles()
    const classes = useStyles()

    return (
        <>
            <div>
                <Link
                    to={Routes.GROUPS_ADMIN_VIEW.replace(
                        ':id',
                        groupId.toString()
                    )}
                    style={{
                        fontSize: '12px',
                        textTransform: 'uppercase',
                        fontWeight: 800
                    }}
                    className={classes.link}
                    onClick={() => console.log('click')}
                >
                    <ArrowBack
                        style={{ fontSize: '18px', marginRight: '8px' }}
                    />
                    {editedGroup.metadata.name}
                </Link>
                <div className={classes.heroBlock}>
                    <h1>Group Details</h1>
                    <Link
                        to={Routes.GROUPS_EDIT.replace(
                            ':id',
                            groupId.toString()
                        )}
                    >
                        <PrimaryButton>edit group</PrimaryButton>
                    </Link>
                </div>
                <div className={classes.heroBlock}>
                    <p className="subtitle">
                        {editedGroup.metadata.description}
                    </p>
                </div>
                <div className={classes.regen}>
                    <p style={{ marginLeft: '0' }}>group admin</p>
                    <p>{editedGroup.info.admin}</p>
                </div>
                <br/>
            </div>
            <Paper elevation={2}>
                <h2 style={{ padding: '40px', fontWeight: 900 }}>
                    Group Policy
                </h2>
                <Table
                    className={tablesStyles.table}
                    aria-label="customized table"
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>Date</StyledTableCell>
                            <StyledTableCell align="left">
                                voting window
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                threshold
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                quorum
                            </StyledTableCell>
                            <StyledTableCell align="left">
                                admin
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {editedGroup.policy && (
                            <StyledTableRow>
                                <StyledTableCell align="left">
                                    {editedGroup.policy.createdAt.toLocaleString()}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {editedGroup.policy.timeoutInDays} days
                                </StyledTableCell>
                                <StyledTableCell align="left">{`${editedGroup.policy.threshold}%`}</StyledTableCell>
                                <StyledTableCell align="left">
                                    {editedGroup.policy.quorum}
                                </StyledTableCell>
                                <StyledTableCell align="left">
                                    {truncateAddress(editedGroup.info.admin)}
                                </StyledTableCell>
                            </StyledTableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </>
    )
}

export default GroupPolicyHeader
