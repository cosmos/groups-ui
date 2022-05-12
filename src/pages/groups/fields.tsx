import React from "react";
import { Button, IconButton, makeStyles, TextField } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { Page } from "../page";
import { useStores } from "../../shared-state/repo";
import { cloneDeep } from "lodash";
import { toJS } from "mobx";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "block",
    flexWrap: "wrap",
    "& > *": {
      margin: "0 auto",
      width: "560px",
      padding: "50px 30px",
    },
  },
  title: {
    fontWeight: 900,
    fontSize: "38px",
    margin: "0 auto",
    textAlign: "center",
  },
  subTitle: {
    marginTop: "25px",
    textAlign: "center",
    fontSize: "18px",
    lineHeight: "27px",
  },
  finishedBtn: {
    display: "block",
    margin: "50px auto",
    backgroundColor: "#3D7ACF",
    borderRadius: "4px",
    padding: "14px 49px",
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: 800,
    fontSize: "18px",
    lineHeight: "23px",
    transition: ".3s",

    "&:hover": {
      backgroundColor: "#3061a6",
    },
  },
  label: {
    width: "100%",
    display: "block",
    margin: "0 auto 42px auto",
    "& .max": {
      marginTop: "10px",
      marginBottom: "10px",
      fontSize: "16px",
      lineHeight: "24px",
    },
  },
  input: {
    display: "flex",
    alignItems: "center",

    "& p": {
      fontWeight: 700,
      fontSize: "16px",
      lineHeight: "23.2px",
      marginLeft: "20px",
    },
  },
  inputTitle: {
    fontFamily: "'Lato', sans-serif",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "18px",
    lineHeight: "145%",
    marginBottom: "10px",
    "& span": {
      color: "#D2D5D9",
    },
    "& .subTitle": {
      marginTop: "5px",
      color: "#545555",
      fontSize: "14px",
      lineHeight: "21px",
      fontWeight: 400,
    },
  },
  cardBtn: {
    padding: "12px",
    fontFamily: "'Mulish' sans-serif",
    fontSize: "18px",
    fontWeight: "bold",
    lineHeight: "23px",
  },
  radio: {
    width: "100%",
    padding: "20px",
    display: "flex",
    cursor: "pointer",
    alignItems: "center",

    "& p": {
      fontFamily: "'Lato', sans-serif",
      fontStyle: "normal",
      fontWeight: "bold",
      fontSize: "18px",
      lineHeight: "145%",

      "& span": {
        color: "#545555",
      },
    },

    "& input": {
      appearance: "none",
      borderRadius: "50%",
      width: "20px",
      height: "20px",
      border: "2px solid #999",
      transition: "0.2s all linear",
      marginRight: "12px",
    },
    "& input:checked": {
      border: "5px solid #3D7ACF",
    },
  },
  radioBox: {
    border: "1px solid #D2D5D9",
    borderRadius: "5px",
    marginBottom: "10px",
  },
}));

const Fields = (props: any) => {
  const classes = useStyles();
  const { editedGroup, updateEditedGroup } = useStores().groupsStore;

  const group = React.useMemo(() => editedGroup, [editedGroup]);
  const handleUpdateClick = React.useCallback(
    () =>
      updateEditedGroup({
        ...editedGroup,
        members: [
          ...editedGroup.members,
          {
            group_id: editedGroup.info.id,
            member: {
              address: "",
              weight: "1",
              added_at: new Date(),
              metadata: JSON.stringify({
                name: "",
              }),
            },
          },
        ],
      }),
    [editedGroup, updateEditedGroup]
  );

  if (!editedGroup) {
    return (
      <Page>
        <div>loading ...</div>
      </Page>
    );
  }

  return (
    <>
      {editedGroup.members.map((m, i) => {
        return (
          <div className={classes.label} key={i}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <TextField
                style={{ width: "80%" }}
                id="outlined"
                variant="outlined"
                label="Group member address"
                value={m.member.address}
                onChange={(e) => {
                  const newMembers = cloneDeep(toJS(editedGroup.members));
                  newMembers[i].member.address = e.target.value;
                  updateEditedGroup({
                    ...editedGroup,
                    members: newMembers,
                  });
                }}
              />
              <TextField
                placeholder="1"
                variant="outlined"
                style={{ width: "84px", marginLeft: "20px" }}
              />
              <IconButton
                aria-label="delete"
                disabled={editedGroup.members.length === 1}
                onClick={() => {
                  updateEditedGroup({
                    ...editedGroup,
                    members: editedGroup.members.filter(
                      (i) => m.member.address !== i.member.address
                    ),
                  });
                }}
              >
                <Delete />
              </IconButton>
              {i === editedGroup.members.length - 1 && (
                <Button
                  className={classes.cardBtn}
                  disabled={
                    editedGroup.members[editedGroup.members.length - 1].member
                      .address.length === 0
                  }
                  variant="outlined"
                  color="primary"
                  onClick={handleUpdateClick}
                >
                  {"Add"}
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Fields;
