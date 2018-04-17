import { stat } from "fs";

interface Action {
    type: string
    payload?: any
}

interface Reducer<T> {
    (state: T, action: Action): T;
}

let incrementAction: Action = {type: 'INCREMENT'}
let decrementAction: Action = {type: 'DECREMENT'}
let plusSevenAction: Action = {type: 'PLUS', payload: 7}

let reducer: Reducer<number> = (state: number, action: Action) => {
    switch(action.type){
    case 'INCREMENT':
        return state + 1;
    case 'DECREMENT':
        return state -1;
    case 'PLUS':
        return state + action.payload;
    default:
        return state;
}
}

console.log(reducer(0, incrementAction));
console.log(reducer(1, incrementAction));
console.log(reducer(100, decrementAction));
console.log(reducer(3, plusSevenAction));
