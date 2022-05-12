import { TableBody } from "@material-ui/core";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState, useCallback } from "react";
import { GroupPolicyTableRow } from "./group-policy-table-row";
import { IGroupPolicyTableBody, IMember, IUpdatedList } from "./groups-type";
import { structData } from "./utils";
import { useStores } from "../../shared-state/repo";

const GroupPolicyTableBody: React.FC<IGroupPolicyTableBody> = observer(
  ({ reset, members, newMember }) => {
    const { updateGroup } = useStores().groupsStore;
    const [toBeDeletedList, setToBeDeletedList] = useState<[]>([]);
    const [toBeUpdateList, setToBeUpdateList] = useState<IUpdatedList>(
      structData(members)
    );

    const updateList = useCallback(
      (data: React.SetStateAction<IUpdatedList>) => setToBeUpdateList(data),
      []
    );

    const deleteList = useCallback(
      (data: React.SetStateAction<[]>) => setToBeDeletedList(data),
      []
    );

    useEffect(
      () => updateGroup(toBeUpdateList, toBeDeletedList),
      [toBeDeletedList, toBeUpdateList, updateGroup]
    );

    return (
      <TableBody>
        {members.map(({ address, weight, addedAt, status }: IMember) => (
          <GroupPolicyTableRow
            key={address}
            reset={reset}
            weight={weight}
            status={status}
            address={address}
            addedAt={addedAt}
            newMember={newMember}
            setToBeUpdateList={updateList}
            toBeUpdateList={toBeUpdateList}
            setToBeDeletedList={deleteList}
            toBeDeletedList={toBeDeletedList}
          />
        ))}
      </TableBody>
    );
  }
);

export default GroupPolicyTableBody;
