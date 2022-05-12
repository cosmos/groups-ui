import React, { useEffect, useState, useCallback } from "react";
import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
} from "@material-ui/core";
import { ArrowBack, Delete } from "@material-ui/icons";
import { observer } from "mobx-react-lite";
import { useStyles } from "./admin-view";
import { Link, useHistory, useParams } from "react-router-dom";
import { Page } from "../page";
import { useStores } from "../../shared-state/repo";
import { Routes } from "../../routes";
import { GroupMember } from "../../generated/cosmos/group/v1beta1/types";
import Pagination from "@material-ui/lab/Pagination";
import { PrimaryButton } from "../../components/primary-button";
import { truncateAddress } from "../../utils";
import { Data, EnhancedTableProps, memberStatus, Order } from "./groups-type";
import { headCells, members } from "./constants";
import {
    StyledTableCell,
    StyledTableRow,
    useTableStyles,
} from "./group-styles";
import { EnhancedTableHead } from "./enhanced-table-head";

const GroupPolicyHeader = ({ editedGroup, groupId }) => {
    const tablesStyles = useTableStyles();
    const classes = useStyles();

    return (
        <>
            <div>
                <Link
                    to={Routes.GROUPS_ADMIN_VIEW.replace(
                        ":id",
                        groupId.toString()
                    )}
                    style={{
                        fontSize: "12px",
                        textTransform: "uppercase",
                        fontWeight: 800,
                    }}
                    className={classes.link}
                    onClick={() => console.log("click")}
                >
                    <ArrowBack
                        style={{ fontSize: "18px", marginRight: "8px" }}
                    />
                    {editedGroup.metadata.name}
                </Link>
                <div className={classes.heroBlock}>
                    <h1>Group Details</h1>
                    <Link
                        to={Routes.GROUPS_EDIT.replace(
                            ":id",
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
                    <p style={{ marginLeft: "0" }}>group admin</p>
                    <p>{editedGroup.info.admin}</p>
                </div>
                <br />
            </div>
            <Paper elevation={2}>
                <h2 style={{ padding: "40px", fontWeight: 900 }}>
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
    );
};

export default GroupPolicyHeader;
