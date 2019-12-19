export enum ColumnType {
    TIMESTAMP,
    PHONE_NUMBER,
    TEXT,
    BITMAP,
    GENERAL_STRING,
    GENERAL_NUMBER,
    GLOBAL_TITLE,
    COUNTRY_CODE,
    NETWORK_CODE,
    FEATURE_CODES,
    PROFILE_CODES,
    LINK,
    BINARY,
    MIXED,
    BOOLEAN,
    JSON
}

export class Column {
    public type: ColumnType;
    public name: string;
    public indexed: boolean;
    public toString = (): string => this.name;
}
