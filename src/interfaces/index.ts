export interface iColumns {
    [key: number]: string
}

export interface iRows {
    [key: number]: (string | boolean)[];
}

export interface TableProps {
    rows: Array<Array<boolean | string>>;
    columns: string[];
    loading: boolean;
    setRows: React.Dispatch<React.SetStateAction<(string | boolean)[][]>>
}
