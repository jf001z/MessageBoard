import React, { FC } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAllTeams } from './actions';
import { Sidebar } from './components/SideBar';
import { MainRoute } from './components/Route';
import { useFetchAllTeams } from './hooks/app/useFetchAllTeams';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      height: '100%',
      flexGrow: 1,
      padding: theme.spacing(3),
      display: 'flex',
      flexDirection: 'column',
    },
    container: {
      fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
      height: '100%',
      width: '100%',
      display: 'flex',
    },
  }),
);

const mapDispatchToProps = { setAllTeams };

export const App: FC = () => {
  const classes = useStyle();
  const { data, error, loading } = useFetchAllTeams();
  const dispatch = useDispatch();
  const { setAllTeams } = bindActionCreators(mapDispatchToProps, dispatch);
  if (loading) {
    return <div> ... loading ... </div>;
  }
  if (error) {
    return <div> ... something wrong ... </div>;
  }
  setAllTeams(data.getAllTeams);
  return (
    <div className={classes.container}>
      <Sidebar />
      <main className={classes.content}>
        <MainRoute />
      </main>
    </div>
  );
};
