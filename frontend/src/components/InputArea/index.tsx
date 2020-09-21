import React, { FC, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  Typography,
  TextField,
  TextareaAutosize,
  Button,
} from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { UpsertMessage, GetMessage } from '../../graphql';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: 'calc( 40% - 24px )',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    inputContainer: {
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
    },
    infoContainer: {
      height: '100%',
      width: '70%',
      paddingRight: theme.spacing(2),
      display: 'flex',
      flexDirection: 'column',
    },
    buttonContainer: {
      height: '100%',
      width: '30%',
    },
    head: {
      marginTop: '12px',
      marginBottom: '12px',
    },
    title: {
      width: '50%',
      marginBottom: theme.spacing(2),
    },
    button: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
  }),
);

export const InputArea: FC = () => {
  const classes = useStyle();
  const [title, setTitle] = useState<string | null>(null);
  const [content, setContent] = useState<string | null>(null);
  const [upsertMessage, { data, error }] = useMutation(UpsertMessage, {
    refetchQueries: ['GetMessage'],
  });
  const titleUpateHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const contentUpateHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setContent(event.target.value);
  };
  const submitHandler = () => {
    upsertMessage({
      variables: {
        message: { title: title, content: content },
      },
    });
  };
  return (
    <div className={classes.container}>
      <Typography className={classes.head} variant="h5" component="h5">
        Write New Messages
      </Typography>
      <div className={classes.inputContainer}>
        <div className={classes.infoContainer}>
          <TextField
            error={!Boolean(title)}
            className={classes.title}
            label="Title"
            variant="outlined"
            onChange={titleUpateHandler}
            required
          />
          <TextareaAutosize
            rowsMin={12}
            placeholder="content"
            onChange={contentUpateHandler}
            required
          />
        </div>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!title || !content}
            onClick={submitHandler}
          >
            SUBMIT NEW MESSAGE
          </Button>
        </div>
      </div>
    </div>
  );
};
