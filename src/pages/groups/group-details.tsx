import React, { useCallback, useEffect, useState, useMemo } from "react";
import { Paper, Table } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import { useStyles } from "./admin-view";
import { useHistory, useParams } from "react-router-dom";
import { Page } from "../page";
import { useStores } from "../../shared-state/repo";
import { Routes } from "../../routes";
import { GroupMember } from "../../generated/cosmos/group/v1beta1/types";
import {
  Data,
  IMember,
  IUpdatedList,
  memberStatus,
  Order,
} from "./groups-type";
import { useTableStyles } from "./group-styles";
import { EnhancedTableHead } from "./enhanced-table-head";
import GroupPolicyHeader from "./group-policy-header";
import GroupPolicyBody from "./group-policy-body";
import GroupPolicyTableBody from "./group-policy-table-body";
import GroupFooter from "./group-footer";

const GroupDetails: React.FC<{}> = observer(() => {
  const members: Array<IMember> = [];

  const {
    originalEditedGroup,
    editedGroup,
    resetEditedGroup,
    fetchEditedGroupById,
  } = useStores().groupsStore;

  const [newMember, setNewMember] = useState("");
  const [membersEditMode, setMembersEditMode] = useState(true); // TODO

  const classes = useStyles();
  const history = useHistory();
  const pathParams: any = useParams();
  const tablesStyles = useTableStyles();

  const [order, setOrder] = useState<Order>("asc");
  const [selected] = useState<readonly string[]>([]);
  const [orderBy, setOrderBy] = useState<keyof Data>("address");
  const [reset, setReset] = useState(false);

  const groupId = pathParams.id === "new" ? -1 : Number(pathParams.id);

  //TO-DO pagination
  //   const [page, setPage] = React.useState(0);
  //   const [dense, setDense] = React.useState(false);
  //   const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  useEffect(() => {
    if (!editedGroup) {
      if (groupId === -1) {
        history.push(Routes.GROUPS_NEW);
      } else {
        (async () => {
          const group = await fetchEditedGroupById(groupId);
          if (!group) {
            history.push(Routes.GROUPS);
          }
        })();
      }
    }
  }, [editedGroup, fetchEditedGroupById, groupId, history, resetEditedGroup]);

  if (!editedGroup) {
    return (
      <Page>
        <div>loading ...</div>
      </Page>
    );
  }

  const originalMembersMap = new Map<string, GroupMember>(
    originalEditedGroup.members.map((m) => [m.member.address, m])
  );
  const membersMap = new Map<string, GroupMember>(
    editedGroup.members.map((m) => [m.member.address, m])
  );

  editedGroup.members.forEach((m) => {
    const status = ((): memberStatus => {
      const original = originalMembersMap.get(m.member.address);
      if (!original) {
        return "newAdded";
      }

      if (original.member.weight !== m.member.weight) {
        return "changed";
      }

      return "unChanged";
    })();

    members.push({
      address: m.member.address,
      addedAt: m.member.added_at,
      weight: Number(m.member.weight),
      status,
    });
  });

  originalEditedGroup.members.forEach((m) => {
    const member = membersMap.get(m.member.address);
    if (!member) {
      members.push({
        address: m.member.address,
        addedAt: m.member.added_at,
        weight: Number(m.member.weight),
        status: "newDeleted",
      });
    }
  });

  return (
    <Page>
      <div className={classes.root}>
        <GroupPolicyHeader editedGroup={editedGroup} groupId={groupId} />
        <Paper elevation={2} style={{ marginTop: "21px" }}>
          <GroupPolicyBody
            setReset={setReset}
            newMember={newMember}
            setNewMember={setNewMember}
            membersEditMode={membersEditMode}
            setMembersEditMode={setMembersEditMode}
          />
          <Table
            className={tablesStyles.table}
            aria-label="custom pagination table"
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={editedGroup.members.length}
            />
            <GroupPolicyTableBody
              reset={reset}
              members={members}
              newMember={newMember}
            />
            <GroupFooter />
          </Table>
        </Paper>
      </div>
    </Page>
  );
});

export default React.memo(GroupDetails);
