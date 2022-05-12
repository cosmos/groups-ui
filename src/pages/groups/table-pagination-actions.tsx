import React, { useEffect, useState, useCallback } from "react";
import {
    Box,
    Button,
    IconButton,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableRow,
    TableSortLabel,
    TextField,
    useTheme,
    withStyles,
} from "@material-ui/core";
import {
    ArrowBack,
    Delete,
    KeyboardArrowLeft,
    KeyboardArrowRight,
} from "@material-ui/icons";
import { observer } from "mobx-react-lite";
import { useStyles } from "./admin-view";
import PropTypes from "prop-types";
import { Link, useHistory, useParams } from "react-router-dom";
import { Page } from "../page";
import { useStores } from "../../shared-state/repo";
import { Routes } from "../../routes";
import { GroupMember } from "../../generated/cosmos/group/v1beta1/types";
import Pagination from "@material-ui/lab/Pagination";
import { PrimaryButton } from "../../components/primary-button";
import { truncateAddress } from "../../utils";
import { memberStatus } from "./groups-type";
import { members } from "./constants";
import { useStyles1 } from "./group-styles";

export function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowRight />
                ) : (
                    <KeyboardArrowLeft />
                )}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === "rtl" ? (
                    <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                )}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};
