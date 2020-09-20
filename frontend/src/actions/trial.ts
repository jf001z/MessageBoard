import { Action } from 'redux';
export interface TestActionType extends Action<string> {
  payload?: string;
}

export enum TestType {
  START_TEST = 'START_TEST',
  END_TEST = 'END_TEST',
}

export const startTest = (test: string): TestActionType => {
  return { type: TestType.START_TEST, payload: test };
};

export const endTest = (): TestActionType => {
  return { type: TestType.END_TEST };
};
