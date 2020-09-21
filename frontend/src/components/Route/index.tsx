import React, { FC } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Routes } from '../../constants';
import { Home } from '../Home';

export const MainRoute: FC = () => {
  return (
    <Switch>
      <Route path={Routes.Home}>
        <Home />
      </Route>
      <Route path="*">
        <div>page not found</div>
      </Route>
    </Switch>
  );
};
