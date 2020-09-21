import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup } from '@material-ui/core';
import { GetMessageFilter, Message } from '../../@types';

interface Props {
  displayRule: GetMessageFilter;
  setDisplayRule: React.Dispatch<React.SetStateAction<GetMessageFilter>>;
}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '30%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding: theme.spacing(2),
    },
    button: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  }),
);

export const ControlArea: FC<Props> = (props: Props) => {
  const { displayRule, setDisplayRule } = props;
  const classes = useStyle();
  return (
    <div className={classes.container}>
      <Button
        variant="contained"
        color="primary"
        disabled={displayRule === GetMessageFilter.TODAY}
        onClick={() => setDisplayRule(GetMessageFilter.TODAY)}
        className={classes.button}
      >
        SHOW TODAY MESSAGES
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => setDisplayRule(GetMessageFilter.WEEK)}
        disabled={displayRule === GetMessageFilter.WEEK}
      >
        SHOW LAST 7 DAYS MESSAGES
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => setDisplayRule(GetMessageFilter.MONTH)}
        disabled={displayRule === GetMessageFilter.MONTH}
      >
        SHOW LAST 30 DAYS MESSAGES
      </Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={() => setDisplayRule(GetMessageFilter.ALL)}
        disabled={displayRule === GetMessageFilter.ALL}
      >
        SHOW ALL MESSAGES
      </Button>
    </div>
  );
};
