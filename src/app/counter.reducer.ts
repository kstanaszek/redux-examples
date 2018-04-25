import { AppState } from "./app.state";
import { Reducer, Action} from "redux";

import {
    INCREMENT,
    DECREMENT
  } from './counter.actions';

const innitialState: AppState = {counter: 0};

export const counterReducer: Reducer<AppState> = (state: AppState = innitialState, action: Action): AppState => {
    switch(action.type) {
        case INCREMENT:
            return Object.assign({}, state, {counter: state.counter + 1})
        case DECREMENT:
        return Object.assign({}, state, {counter: state.counter -1})
        default:
            return state;
    }
}