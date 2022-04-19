export interface Data {
  calories: number
  carbs: number
  fat: number
  name: string
}

export interface TablePaginationActionsProps {
  count: number
  page: number
  rowsPerPage: number
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void
}

export type Order = 'asc' | 'desc'

export interface HeadCell {
  disablePadding: boolean
  id: keyof Data
  label: string
  numeric: boolean
}

export interface ITableInner {
  isItemSelected: boolean
  row: any
  labelId: string
}

export interface EnhancedTableToolbarProps {
  numSelected: number
}

export interface EnhancedTableProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}
