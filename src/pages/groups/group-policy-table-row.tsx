import React, { useState, useCallback, useEffect } from "react";
import { TextField } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useStores } from "../../shared-state/repo";
import {
  StyledTableCell,
  StyledTableRow,
  useTableStyles,
} from "./group-styles";
import { IModifyItems, IMember } from "./groups-type";
import MembersButton from "./update-member-button";
import { dateFormat, getStyle } from "./utils";
import { toJS } from "mobx";

const GroupPolicyTableRow: React.FC<IMember & IModifyItems> = observer(
  ({
    address,
    weight,
    reset,
    addedAt,
    status,
    newMember,
    toBeDeletedList,
    toBeUpdateList,
    setToBeDeletedList,
    setToBeUpdateList,
  }) => {
    const { updateEditedGroup, editedGroup } = useStores().groupsStore;

    const [isToBeDeletedMember, setToBeDeletedMember] =
      useState<boolean>(false);

    const [isNewMember, setNewMemberToBeCancelled] = useState<boolean>(
      newMember === address
    );
    const [localWeight, setLocalWeight] = useState<string>(String(weight));

    const tablesStyles = useTableStyles();
    const handleChange = (e) => {
      let target = e.target.value;
      target = Math.max(0, parseInt(e.target.value)).toString().slice(0, 12);
      if (isNaN(target)) target = "0";
      setLocalWeight((prev) => (prev = target));
    };

    useEffect(() => {
      toBeUpdateList[address] = localWeight;
      setToBeUpdateList((prev) => ({
        ...prev,
        ...toBeUpdateList,
      }));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [localWeight]);

    const handleUpdateMemberOnClick = useCallback(() => {
      if (isNewMember) {
        setNewMemberToBeCancelled((prev) => !prev);
        const members: any = toJS(editedGroup.members);
        members.pop();
        updateEditedGroup({
          ...editedGroup,
          members: [...members],
        });
      } else {
        setToBeDeletedMember((prev) => !prev);
      }
    }, [editedGroup, isNewMember, updateEditedGroup]);

    useEffect(() => {
      if (isToBeDeletedMember) {
        setToBeDeletedList((prev) => [...prev, address]);
      } else {
        let cutList = [...toBeDeletedList].filter((id) => id !== address);
        setToBeDeletedList(cutList);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [handleUpdateMemberOnClick, isToBeDeletedMember]);

    useEffect(() => {
      if (reset) {
        setToBeDeletedMember(false);
        setNewMemberToBeCancelled(false);
      }
    }, [reset]);

    let btn_class = getStyle(
      reset,
      isNewMember,
      isToBeDeletedMember,
      tablesStyles
    );

    return (
      <StyledTableRow key={address} className={btn_class}>
        <StyledTableCell
          align="left"
          style={{
            width: "15%",
            padding: "28px 40px",
          }}
        >
          {address}
        </StyledTableCell>
        <StyledTableCell
          align="left"
          style={{
            width: "15%",
            padding: "28px 40px",
          }}
        >
          <TextField
            name="number"
            variant="outlined"
            style={{
              backgroundColor: "#FAFAFA",
              width: "56px",
              textAlign: "center",
            }}
            value={localWeight}
            onChange={handleChange}
          />
        </StyledTableCell>
        <StyledTableCell
          align="left"
          style={{
            width: "30%",
            padding: "28px 40px",
            color: "##202020",
            fontFamily: "Lato",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: "16px",
            lineHeight: "150%",
          }}
        >
          {dateFormat(addedAt)}
        </StyledTableCell>
        <StyledTableCell
          align="right"
          style={{
            width: "30%",
            padding: "28px 40px",
          }}
        >
          <MembersButton
            isNewMember={isNewMember}
            isToBeDeletedMember={isToBeDeletedMember}
            handleUpdateMemberOnClick={handleUpdateMemberOnClick}
          />
        </StyledTableCell>
      </StyledTableRow>
    );
  }
);

export { GroupPolicyTableRow };
