import React, { FC, useState } from 'react';
import { useQuery, useSubscription } from '@apollo/client';
import { Paper } from '@material-ui/core';
import { GetMessageFilter, Message } from '../../@types';
import { GetMessage, RealTimeMessageUpdate } from '../../graphql';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { MessageItem } from './messageItem';
import { ControlArea } from './controlArea';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      width: '100%',
      height: 'calc( 100% - 32px)',
      display: 'flex',
      flexDirection: 'row',
    },
    displayArea: {
      height: 'calc( 100% - 32px)',
      width: '70%',
      overflow: 'auto',
      padding: theme.spacing(1),
    },
  }),
);

export const DisplayArea: FC = () => {
  const [displayRule, setDisplayRule] = useState<GetMessageFilter>(
    GetMessageFilter.TODAY,
  );
  const { loading, error, data } = useQuery(GetMessage, {
    variables: { filter: displayRule },
  });
  const classes = useStyle();

  useSubscription(RealTimeMessageUpdate, {
    onSubscriptionData: ({ client, subscriptionData: { data } }) => {
      if (!data) return;
      const allData: { getMessages: Message[] } = client.readQuery({
        query: GetMessage,
        variables: { filter: displayRule },
      }) as { getMessages: Message[] };
      console.log(allData);
      const allMessages = [
        data?.subscribeLatestMessage,
        ...allData.getMessages,
      ] as Message[];
      // update cache
      client.writeQuery({
        query: GetMessage,
        variables: { filter: displayRule },
        data: { getMessages: allMessages },
      });
    },
  });
  if (loading || !Array.isArray(data.getMessages)) {
    return <div className={classes.container}> loading</div>;
  }
  if (error) {
    return <div className={classes.container}>something wrong </div>;
  }

  const messages = data.getMessages
    .slice()
    .sort((a: Message, b: Message) => (a.create_time > b.create_time ? -1 : 1));
  return (
    <div className={classes.container}>
      <Paper elevation={3} className={classes.displayArea}>
        {messages.map((message: Message) => {
          return <MessageItem key={message._id} message={message} />;
        })}
      </Paper>
      <ControlArea displayRule={displayRule} setDisplayRule={setDisplayRule} />
    </div>
  );
};
