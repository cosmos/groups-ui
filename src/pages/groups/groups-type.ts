import { Group } from "../../shared-state/groups-store";

export type memberStatus = "unChanged" | "changed" | "newDeleted" | "newAdded";

export type Order = "asc" | "desc";

export interface Data {
  address: string;
  weight: string;
  date: string;
}

export interface IUpdateMembersButton {
  isNewMember: boolean;
  isToBeDeletedMember: boolean;
  handleUpdateMemberOnClick: (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => void;
}

export interface IGroupPolicyBody {
  setReset: React.Dispatch<React.SetStateAction<boolean>>;
  newMember: string;
  membersEditMode: boolean;
  setNewMember: React.Dispatch<React.SetStateAction<string>>;
  setMembersEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface IMember {
  address: string;
  addedAt: Date;
  weight: number;
  status: memberStatus;
}
export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

export interface IModifyItems {
  reset: boolean;
  newMember: string;
  toBeDeletedList: string[];
  setToBeDeletedList: React.Dispatch<React.SetStateAction<string[]>>;
  toBeUpdateList: IUpdatedList;
  setToBeUpdateList: React.Dispatch<React.SetStateAction<IUpdatedList>>;
}

export interface IUpdatedList {
  [key: string]: string;
}

export interface IGroupPolicyTableBody {
  reset: boolean;
  members: Array<IMember>;
  newMember: string;
}
