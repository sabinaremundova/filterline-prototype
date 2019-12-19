import {Column, ColumnType} from './column.model';

export const columnSamples: Column[] = [
  {
    name: 'DELIVERY_TIME',
    type: ColumnType.TIMESTAMP,
    indexed: true
  },
  {
    name: 'DONE_TIME',
    type: ColumnType.TIMESTAMP,
    indexed: true
  },
  {
    name: 'SUBMIT_TIME',
    type: ColumnType.TIMESTAMP,
    indexed: true
  },
  {
    name: 'A_ADDR_COUNTRY_CODE',
    type: ColumnType.COUNTRY_CODE,
    indexed: true
  },
  {
    name: 'B_ADDR_COUNTRY_CODE',
    type: ColumnType.COUNTRY_CODE,
    indexed: true
  },
  {
    name: 'A_ADDR_COUNTRY_NAME',
    type: ColumnType.GENERAL_STRING,
    indexed: true
  },
  {
    name: 'B_ADDR_COUNTRY_NAME',
    type: ColumnType.GENERAL_STRING,
    indexed: true
  },
  {
    name: 'NON_FILTERABLE_COLUMN',
    type: ColumnType.JSON,
    indexed: false
  }
];
