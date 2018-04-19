interface Action {
    type: string
    payload?: any
}

interface Reducer<T> {
    (state: T, action: Action): T;
}

interface ListenerCallback{
    (): void;
}

interface UnsubscribeCallback{
    (): void;
}

class Store<T> {
    private _state: T;
    private _action: Action = {type: 'INITIAL'};
    private _listeners: ListenerCallback[] = [];

    constructor(private reducer: Reducer<T>, initialState: T){
        this._state = initialState;
    }

    getState(){
        return this._state;
    }

    getActionType(){
        return this._action.type;
    }

    subscribe(listener: ListenerCallback): UnsubscribeCallback {
        this._listeners.push(listener);
        return() => {
            this._listeners = this._listeners.filter(l => l !== listener);
        }
    }

    dispatch(action: Action): void {
        this._action = action;
        this._state = this.reducer(this._state, action)
        this._listeners.forEach((listener: ListenerCallback) => listener());
    }

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

let store: Store<number> = new Store<number>(reducer, 1000);

let unsubscribe1: UnsubscribeCallback = store.subscribe(() => {
    console.log('listener 1: state = ' + store.getState() + ' action = ' + store.getActionType() )
})
console.log("listener 1 added")

let unsubscribe2: UnsubscribeCallback = store.subscribe(() => {
    console.log('listener 2: state = ' + store.getState() + ' action = ' + store.getActionType() )
})
console.log("listener 2 added")

console.log(store.getState());
console.log("initial state checked")
store.dispatch(incrementAction)
store.dispatch(incrementAction)

unsubscribe1();
console.log("unsubscribed listener 1")
store.dispatch(decrementAction);
unsubscribe2();
console.log("unsubscribed listener 2")
console.log(store.getState());
console.log("the latest state checked")

let unsubscribe3: UnsubscribeCallback =  store.subscribe(() => {
    console.log('listener 3: state = ' + store.getState() + ' action = ' + store.getActionType() )
})
console.log("listener 3 added")

store.dispatch(incrementAction)
store.dispatch(incrementAction)
store.dispatch(incrementAction)
unsubscribe3();
console.log("unsubscribed listener 3")
store.dispatch(incrementAction)
store.dispatch(incrementAction)
store.dispatch(incrementAction)

console.log(store.getState());
console.log("the latest state checked")