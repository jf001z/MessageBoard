import React, { FC } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, Typography } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Message } from '../../@types';

interface Props {
  message: Message;
}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    item: {
      marginBottom: '12px',
    },
  }),
);

export const MessageItem: FC<Props> = (props: Props) => {
  const { message } = props;
  const classes = useStyle();
  return (
    <Card className={classes.item}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {message.title}
        </Typography>
        <Typography color="textSecondary">
          from: {message.ip} create at:
          {format(message.create_time, 'MM/dd/yyyy HH:mm:ss')}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {message.content}
        </Typography>
      </CardContent>
    </Card>
  );
};
