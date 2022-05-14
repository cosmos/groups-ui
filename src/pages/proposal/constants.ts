import { HeadCell } from './proposal-types'

export const headCells: readonly HeadCell[] = [
  {
    id: 'option',
    numeric: false,
    disablePadding: true,
    label: 'vote option',
  },
  {
    id: 'submit_time',
    numeric: true,
    disablePadding: false,
    label: 'date',
  },
  {
    id: 'metadata',
    numeric: true,
    disablePadding: false,
    label: 'metadata',
  },
  {
    id: 'voter',
    numeric: true,
    disablePadding: false,
    label: 'address',
  },
]
