export interface ITableRow {
    id: unknown;
    data: (string | number)[];
    isWarn?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
}
