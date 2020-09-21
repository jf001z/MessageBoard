import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { MainRoute } from './components/Route';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      height: '100%',
      width: '100%',
      padding: theme.spacing(3),
    },
    container: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      height: 'calc( 100% - 36px )',
      width: '100%',
      display: 'flex',
    },
  }),
);

export const App: FC = () => {
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <main className={classes.content}>
        <MainRoute />
      </main>
    </div>
  );
};
