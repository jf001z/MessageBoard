import { TestType, TestActionType } from '../actions';
export const test = (
  state: string | null = null,
  action: TestActionType,
): string | null | undefined => {
  switch (action.type) {
    case TestType.START_TEST:
      return action.payload;
    case TestType.END_TEST:
      return null;
    default:
      return state;
  }
};
