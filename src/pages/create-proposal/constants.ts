import { HeadCell } from './proposal-types'
import { createData } from './utils'

export const rows = [
  createData('Cupcake', 305, 3.7, 67),
  createData('Donut', 452, 25.0, 51),
  createData('Eclair', 262, 16.0, 24),
  createData('Frozen yoghurt', 159, 6.0, 24),
  createData('Gingerbread', 356, 16.0, 49),
  createData('Honeycomb', 408, 3.2, 87),
  createData('Ice cream sandwich', 237, 9.0, 37),
  createData('Jelly Bean', 375, 0.0, 94),
  createData('KitKat', 518, 26.0, 65),
  createData('Lollipop', 392, 0.2, 98),
  createData('Marshmallow', 318, 0, 81),
  createData('Nougat', 360, 19.0, 9),
  createData('Oreo', 437, 18.0, 63),
]

export const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'vote option',
  },
  {
    id: 'calories',
    numeric: true,
    disablePadding: false,
    label: 'status',
  },
  {
    id: 'fat',
    numeric: true,
    disablePadding: false,
    label: 'voting power',
  },
  {
    id: 'carbs',
    numeric: true,
    disablePadding: false,
    label: 'adress',
  },
]
