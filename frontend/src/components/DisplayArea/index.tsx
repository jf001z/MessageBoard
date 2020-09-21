import React, { FC } from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { DisplayArea } from './displayArea';
import {} from './controlArea';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: 'calc( 60% - 12px)',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      marginBottom: '12px',
    },
  }),
);

export const DisplayContainer: FC = () => {
  const classes = useStyle();

  return (
    <div className={classes.container}>
      <Typography className={classes.title} variant="h5" component="h5">
        Messages
      </Typography>
      <DisplayArea />
    </div>
  );
};
