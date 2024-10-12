export interface ITableRow {
    id: unknown;
    data: (string | number | undefined)[];
    isWarn?: boolean;
    isSuccess?: boolean;
    isError?: boolean;
    isEdited?: boolean;
}
