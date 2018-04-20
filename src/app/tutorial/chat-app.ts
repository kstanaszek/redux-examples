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

class Store2<T> {
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


interface AppState {
    messages: string[];
}

interface AddMessageAction extends Action {
    message: string;
}

interface DeleteMessageAction extends Action {
    index: number;
}

let myreducer: Reducer<AppState> = (state: AppState, action: Action): AppState => {
    switch(action.type) {
        case 'ADD_MESSAGE':
            return {
                messages: state.messages.concat(
                  (<AddMessageAction>action).message  
                )
            }
        case 'DELETE_MESSAGE':
            let idx = (<DeleteMessageAction>action).index;
            return {
                messages: [
                    ...state.messages.slice(0, idx),
                    ...state.messages.slice(idx+1, state.messages.length)
                ]
            }
    }
}

let mystore = new Store2<AppState>(myreducer, {messages: [] });


mystore.dispatch({
    type: 'ADD_MESSAGE',
    message: 'Would you say the fringe was made of silk?'
} as AddMessageAction)

mystore.dispatch({
    type: 'ADD_MESSAGE',
    message: 'Wouldnt have no other kind but silk'
} as AddMessageAction)


console.log(mystore.getState());