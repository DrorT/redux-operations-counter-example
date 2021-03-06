import React, { Component, PropTypes } from 'react'
import {walkState, bindOperationToActionCreators} from 'redux-operations';
import {actionCreators, counter as counterReducer} from '../ducks/counter';
import {connect} from 'react-redux';

const mapStateToProps = (state, props) => {
  return {
    counter: props.location ? walkState(props.location, state, counterReducer) : state.counter
  }
};

@connect(mapStateToProps)
export default class Counter extends Component {
  render() {
    const { location, counter, dispatch} = this.props;
    const {increment, decrement, incrementIfOdd,
      incrementAsync, setFromFetch, setCounter} = bindOperationToActionCreators(location, counterReducer, actionCreators);
    return (
      <div>
        <p>
          Value: {counter} times
          {' '}
          <button onClick={() => dispatch(increment())}>+</button>
          {' '}
          <button onClick={() => dispatch(decrement())}>-</button>
          {' '}
          <button onClick={() => dispatch(incrementIfOdd())}>+ if odd</button>
          {' '}
          <button onClick={() => dispatch(incrementAsync())}>Async +</button>
          {'   '}
          <button onClick={() => dispatch(setFromFetch())}>Fetch random promise</button>
          {'   '}
          <input type="text" ref="setInput" size="3" defaultValue="0"/>
          <button onClick={() => dispatch(setCounter(this.refs['setInput'].value))}>Set input</button>
          {' '}
        </p>
      </div>
    )
  }
}
