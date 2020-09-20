import React, { FC, Fragment } from 'react';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { Typography } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { useParams, useHistory } from 'react-router-dom';
import { Team, RootState, Group } from '../../@types';
import { selectAllTasksInAllTeams } from '../../selectors';
import { getTaskById } from '../../graphql';
import { TableBody } from './TableBody';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      paddingTop: theme.spacing(5),
      fontSize: '2rem',
    },
  }),
);

const mapStateToProps = createStructuredSelector<
  RootState,
  { allTeamsWithTasks: Partial<Team>[] }
>({
  allTeamsWithTasks: selectAllTasksInAllTeams,
});
export const Task: FC = () => {
  const { allTeamsWithTasks } = useSelector(mapStateToProps);
  const { teamId, taskId } = useParams();
  const history = useHistory();
  const { data, error, loading } = useQuery(getTaskById, {
    variables: { id: taskId },
  });
  const classes = useStyles();

  if (!teamId || !taskId) {
    const firstTeamId = allTeamsWithTasks[0]._id;
    const firstTaskId = (allTeamsWithTasks[0]?.tasks || [])[0]._id || '';
    history.push(`/task/${firstTeamId}/${firstTaskId}`);
  }
  if (loading) {
    return <div> ... loading </div>;
  }
  if (error) {
    return <div> ... something wrong ... </div>;
  }

  const task = data.getTaskById;
  return (
    <Fragment>
      <div className={classes.root}>{`task: ${task.name}`}</div>
      {task.groups.map((group: Group) => (
        <TableBody key={group.name} group={group} />
      ))}
    </Fragment>
  );
};
