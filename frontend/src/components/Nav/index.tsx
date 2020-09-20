import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { List, ListSubheader } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import { createStructuredSelector } from 'reselect';
import { useSelector } from 'react-redux';
import { RootState, Team } from '../../@types';
import { selectAllTasksInAllTeams } from '../../selectors';
import { TeamListItem } from './TeamListItem';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      marginTop: '30px',
    },
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
    link: {
      textDecoration: 'none',
    },
    rounded: {
      color: '#fff',
      backgroundColor: green[500],
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    textWrap: {
      // nested selector is really powerful, seems better than styled component
      '& span': {
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
      },
    },
  }),
);

const mapStateToProps = createStructuredSelector<
  RootState,
  { allTeamsWithTasks: Partial<Team>[] }
>({
  allTeamsWithTasks: selectAllTasksInAllTeams,
});

export const Nav: FC = () => {
  const { pathname } = useLocation();
  const { allTeamsWithTasks } = useSelector(mapStateToProps);
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            All Workspaces
          </ListSubheader>
        }
      >
        {allTeamsWithTasks.map((team: Partial<Team>) => {
          const teamUrl = `/team/${team._id}`;
          const teamSelected =
            pathname.indexOf('team') > -1 &&
            pathname.indexOf(team?._id || '') > -1;
          return (
            <TeamListItem
              classes={classes}
              team={team}
              teamSelected={teamSelected}
              teamUrl={teamUrl}
              key={team?._id || ''}
            />
          );
        })}
      </List>
    </div>
  );
};
