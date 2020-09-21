import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { DisplayContainer } from '../DisplayArea';
import { InputArea } from '../InputArea';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
  }),
);

export const Home: FC = () => {
  const classes = useStyle();
  return (
    <div className={classes.content}>
      <DisplayContainer />
      <InputArea />
    </div>
  );
};
