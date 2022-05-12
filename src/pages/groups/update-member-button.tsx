import React from "react";
import { IconButton, makeStyles, SvgIcon, Typography } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { ReactComponent as CloseX } from "../../icons/closeX.svg";
import { IUpdateMembersButton } from "./groups-type";

const useStyles = makeStyles((theme) => ({
  deleteButton: {
    padding: 0,
  },
}));

const MembersButton: React.FC<IUpdateMembersButton> = ({
  isNewMember,
  isToBeDeletedMember,
  handleUpdateMemberOnClick,
}) => {
  const classes = useStyles();
  let editMode = isToBeDeletedMember || isNewMember;
  return (
    <div onClick={handleUpdateMemberOnClick}>
      {editMode ? (
        <div>
          <Typography
            style={{
              fontFamily: "Mulish",
              fontStyle: "normal",
              fontWeight: 800,
              fontSize: "12px",
              lineHeight: "15px",
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#000000",
              paddingRight: "40px",
            }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {isToBeDeletedMember ? "undo deletion" : "remove"}
          </Typography>
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", width: "100%" }}>
              <SvgIcon
                component={CloseX}
                style={{
                  position: "absolute",
                  right: "0px",
                  top: "-20px",
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <IconButton aria-label="delete" className={classes.deleteButton}>
          <Delete />
        </IconButton>
      )}
    </div>
  );
};

export default MembersButton;
