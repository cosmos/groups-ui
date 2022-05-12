import { makeStyles, TableCell, TableRow, withStyles } from "@material-ui/core";

export const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

export const StyledTableCell = withStyles(() => ({
  head: {
    padding: "23px 40px",
    fontSize: "12px",
    fontWeight: 800,
    textTransform: "uppercase",
    fontFamily: " 'Mulish', sans-serif ",
  },
  body: {
    padding: "48px 40px",
    fontSize: "16px",
  },
}))(TableCell);

export const StyledTableRow = withStyles((theme) => ({
  root: {
    textAlign: "left",
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

export const useTableStyles = makeStyles({
  table: {
    borderTop: "1px solid #EFEFEF",
    minWidth: 700,
  },
  tableItem: {},
  tableItemToDelete: {
    backgroundColor: "#F8DAD4",
    "&:nth-of-type(odd)": {
      backgroundColor: "#F8DAD4",
    },
  },
  newTableItem: {
    backgroundColor: "#D8E4F5",
    "&:nth-of-type(odd)": {
      backgroundColor: "#D8E4F5",
    },
  },
});
