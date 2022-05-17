import { Data, IMember, Order } from './groups-type'
import moment from 'moment'
import { ClassNameMap } from '@material-ui/core/styles/withStyles'


export function trimDeleted({ target, cutList }: { target: {}; cutList: Array<any> }) {
    if (!cutList.length) return target
    const output = { ...target }
    for (let i of cutList) {
        if (output.hasOwnProperty(i)) {
            delete output[i]
        }
    }
    return output
}


export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1
    }
    if (b[orderBy] > a[orderBy]) {
        return 1
    }
    return 0
}

export function createData(
    address: string,
    weight: string,
    date: string
): Data {
    return {
        address,
        weight,
        date
    }
}

export function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string }
) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy)
}

export function stableSort<T>(
    array: readonly T[],
    comparator: (a: T, b: T) => number
) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number])
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0])
        if (order !== 0) {
            return order
        }
        return a[1] - b[1]
    })
    return stabilizedThis.map((el) => el[0])
}

export const dateFormat = (addedAt: Date) =>
    moment(addedAt).format('MMM, DD YYYY')

export const mapStruct = (array: Array<any>, key: string, value: string) => {
    const map = {}
    for (let i in array) {
        map[array[i][key]] = array[i][value]
    }
    return map
}

export const structData = (members: IMember[]) =>
    mapStruct(members, 'address', 'weight')

export const getStyle = (
    reset: boolean,
    isNewMember: boolean,
    isToBeDeletedMember: boolean,
    tablesStyles: ClassNameMap<'table' | 'tableItem' | 'tableItemToDelete' | 'newTableItem'>
) => {
    if (isToBeDeletedMember) {
        return tablesStyles.tableItemToDelete
    } else if (isNewMember) {
        return tablesStyles.newTableItem
    } else if (reset) {
        return tablesStyles.tableItem
    } else return tablesStyles.tableItem
}
