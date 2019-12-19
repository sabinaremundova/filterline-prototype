import {Bracket, BracketType, LogicalOperator, LogicalOperatorType} from './filters.model';
import {FilterOperatorType} from './types.model';

/**
 * VALUES
 */
export const LOGICAL_OPERATORS: string[] = ['AND', 'OR', 'NOT'];

export const BRACKETS: string[] = ['(', ')'];

export const FILTER_OPERATORS: string[] = Object.values(FilterOperatorType);

export const BRACKETS_AND_OPERATORS: string[] = LOGICAL_OPERATORS.concat(BRACKETS);

