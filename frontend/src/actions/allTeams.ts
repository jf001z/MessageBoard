import { Action } from 'redux';
import { Team } from '../@types';
export interface AllTeamActionType extends Action<string> {
  payload?: Team[];
}

export enum AllTeamType {
  SET_ALL_TEAMS = 'SET_ALL_TEAMS',
}

export const setAllTeams = (allTeams: Team[]): AllTeamActionType => {
  return { type: AllTeamType.SET_ALL_TEAMS, payload: allTeams };
};
