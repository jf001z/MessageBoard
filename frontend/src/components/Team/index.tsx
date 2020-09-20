import React, { FC } from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Team as TeamType, RootState } from '../../@types';
import { selectAllTasksInAllTeams } from '../../selectors';

const mapStateToProps = createStructuredSelector<
  RootState,
  { allTeamsWithTasks: Partial<TeamType>[] }
>({
  allTeamsWithTasks: selectAllTasksInAllTeams,
});
export const Team: FC = () => {
  const { allTeamsWithTasks } = useSelector(mapStateToProps);
  const history = useHistory();
  const firstTeamId = allTeamsWithTasks[0]._id;
  const firstTaskId = (allTeamsWithTasks[0]?.tasks || [])[0]._id || '';
  history.push(`/task/${firstTeamId}/${firstTaskId}`);
  return <div> ... team ... </div>;
};
