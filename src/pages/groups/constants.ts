import { HeadCell, IMember } from "./groups-type";

export const members: Array<IMember> = [];

export const headCells: readonly HeadCell[] = [
  {
    id: "address",
    numeric: false,
    disablePadding: true,
    label: "address",
  },
  {
    id: "weight",
    numeric: true,
    disablePadding: false,
    label: "voting weight",
  },
  {
    id: "date",
    numeric: true,
    disablePadding: false,
    label: "date added",
  },
];
