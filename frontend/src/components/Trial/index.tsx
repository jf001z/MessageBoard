import React, { FC } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { testSelector } from '../../selectors';
import { RootState } from '../../@types';
import { startTest, endTest } from '../../actions';

const mapStateToProps = createStructuredSelector<
  RootState,
  { testStr: string | undefined | null }
>({
  testStr: testSelector,
});

const mapDispatchToProps = {
  startTest,
  endTest,
};

export const Test: FC = () => {
  const { testStr } = useSelector(mapStateToProps);
  const dispatch = useDispatch();
  const { startTest, endTest } = bindActionCreators(
    mapDispatchToProps,
    dispatch,
  );
  const onClickHandler = () => {
    startTest('hello world');
  };
  const onClearHandler = () => {
    endTest();
  };
  return (
    <div>
      <ButtonGroup variant="contained" color="primary">
        <Button onClick={onClickHandler}>Set</Button>
        <Button onClick={onClearHandler}>Clear</Button>
      </ButtonGroup>
      <p>{testStr || 'no test string'}</p>
    </div>
  );
};
