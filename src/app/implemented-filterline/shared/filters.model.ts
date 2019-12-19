import {FilterOperatorType} from './types.model';
import {Column} from './column.model';

/**
 * UNION TYPES
 */
export type BracketType = '(' | ')';
export type LogicalOperatorType = 'NOT' | 'AND' | 'OR';
export type FilterNode = SimpleFilter | FilterTree;
export type FilterPart = LogicalOperator | Bracket | SimpleFilter | 'EMPTY';

/**
 * FILTER PART CLASSES
 */
export class LogicalOperator {

  public operatorType: LogicalOperatorType;

  public constructor(operatorType: LogicalOperatorType) {
    this.operatorType = operatorType;
  }

  public toString = (): string => this.operatorType;
}

export class Bracket {

  public bracketType: BracketType;

  public constructor(bracketType: BracketType) {
    this.bracketType = bracketType;
  }

  public toString = (): string => this.bracketType.toString();
}

export class SimpleFilter {

  public not: boolean;
  public column: Column;
  public operator: FilterOperatorType;
  public value: string;

  public toString = (): string => `${this.not ? 'NOT ' : ''}${this.column.name} ${this.operator} ${this.value}`;
}

/**
 * COMPOSED FILTER CLASS
 */
export class FilterTree {

  public not: boolean;
  public type: LogicalOperatorType;
  public left: FilterNode;
  public right: FilterNode;

  public toString(): string {
    const result: string[] = [];
    for (const part of this.parts) {
      result.push(part.toString());
    }
    return result.join(' ');
  }

  public get parts(): FilterPart[] {
    const result: FilterPart[] = [];

    if (this.not) {
      result.push(new LogicalOperator('NOT'));
    }
    if ((this.left && this.right) || this.not) {
      result.push(new Bracket('('));
    }
    if (this.left) {
      if (this.left instanceof SimpleFilter) {
        result.push(this.left);
      } else if (this.left instanceof FilterTree) {
        result.concat(this.left.parts);
      }
    }
    if (this.left && this.right) {
      result.push(new LogicalOperator(this.type));
    }
    if (this.right) {
      if (typeof this.right === typeof SimpleFilter) {
        result.push(this.right as SimpleFilter);
      } else if (typeof this.right === typeof FilterTree) {
        result.concat((this.right as FilterTree).parts);
      }
    }
    if ((this.left && this.right) || this.not) {
      result.push(new Bracket(')'));
    }
    return result;
  }
}

