import React, { FC } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Routes } from '../../constants';
import { Team } from '../Team';
import { Test } from '../Trial';
import { Task } from '../Task';

export const MainRoute: FC = () => {
  return (
    <Switch>
      <Route path={Routes.Test}>
        <Test />
      </Route>
      <Route path={Routes.Team}>
        <Team />
      </Route>
      <Route path={Routes.Task}>
        <Task />
      </Route>
      <Redirect from={Routes.Home} to={Routes.Team} />
      <Route path="*">
        <div>not match</div>
      </Route>
    </Switch>
  );
};
