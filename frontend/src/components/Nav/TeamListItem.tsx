import React, { FC, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Avatar,
  Collapse,
  List,
  ListItemText,
  ListItem,
  ListItemAvatar,
  Tooltip,
} from '@material-ui/core';
import ExpandLess from '@material-ui//icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import { Team, Task } from '../../@types';

interface Props {
  classes: Record<
    'small' | 'wrapper' | 'root' | 'nested' | 'link' | 'rounded' | 'textWrap',
    string
  >;
  teamUrl: string;
  teamSelected: boolean;
  team: Partial<Team>;
}

export const TeamListItem: FC<Props> = (props: Props) => {
  const { classes, teamUrl, teamSelected, team } = props;

  const { pathname } = useLocation();
  const [open, setOpen] = useState<boolean>(true);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <>
      <ListItem button selected={teamSelected}>
        <Link className={classes.link} to={teamUrl} key={team.name}>
          <ListItemAvatar>
            <Avatar
              variant="rounded"
              className={[classes.rounded, classes.small].join(' ')}
            >
              {(team?.name || '')[0].toLocaleUpperCase()}
            </Avatar>
          </ListItemAvatar>
        </Link>
        <Tooltip title={team.name || ''}>
          <ListItemText className={classes.textWrap} primary={team.name} />
        </Tooltip>
        {open ? (
          <ExpandLess onClick={handleClick} />
        ) : (
          <ExpandMore onClick={handleClick} />
        )}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {(team.tasks || []).map((task: Partial<Task>) => {
            const taskUrl = `/task/${team._id}/${task._id}`;
            const taskSelected =
              pathname.indexOf('task') > -1 &&
              pathname.indexOf(task?._id || '') > -1;
            return (
              <Link className={classes.link} to={taskUrl} key={task.name}>
                <ListItem
                  key={task.name || ''}
                  button
                  className={classes.nested}
                  selected={taskSelected}
                >
                  <Tooltip title={task.name || ''}>
                    <ListItemText
                      className={classes.textWrap}
                      primary={task.name || ''}
                    />
                  </Tooltip>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Collapse>
    </>
  );
};
