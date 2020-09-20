import { createSelector } from 'reselect';
import { RootState, Team } from '../@types';

export const selectAllTasksInAllTeams = createSelector(
  (state: RootState) => state.allTeams,
  (allTeams: Team[]) =>
    allTeams.map((team: Team) => ({
      _id: team._id,
      name: team.name,
      tasks: team.tasks,
    })),
);

export const selectAllUsersInAllTeams = createSelector(
  (state: RootState) => state.allTeams,
  (allTeams: Team[]) =>
    allTeams.map((team: Team) => ({
      _id: team._id,
      name: team.name,
      users: team.users,
    })),
);
