import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Routes } from '../../constants';
import { Team } from '../Team';
import { Test } from '../Trial';
import { Task } from '../Task';

export const MainRoute: FC = () => {
  return (
    <Switch>
      <Route path={Routes.Home}>
        <Test />
      </Route>
      <Route path="*">
        <div>not match</div>
      </Route>
    </Switch>
  );
};
