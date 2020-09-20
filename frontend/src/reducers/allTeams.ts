import { AllTeamActionType, AllTeamType } from '../actions';
import { Team } from '../@types';
export const allTeams = (
  state: Team[] = [],
  action: AllTeamActionType,
): Team[] => {
  switch (action.type) {
    case AllTeamType.SET_ALL_TEAMS:
      return action.payload || [];
    default:
      return state;
  }
};
