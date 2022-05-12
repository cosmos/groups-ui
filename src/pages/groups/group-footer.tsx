import React from "react";
import { TableFooter, TableRow } from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";

const GroupFooter = () => {
  return (
    <TableFooter style={{ height: "90px" }}>
      <TableRow>
        <Pagination
          count={10}
          color="primary"
          style={{
            width: "220%",
            marginTop: "25px",
            display: "flex",
            justifyContent: "flex-end",
          }}
        />
      </TableRow>
    </TableFooter>
  );
};

export default GroupFooter;
