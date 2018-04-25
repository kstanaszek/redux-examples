import {
    Action,
    Reducer,
    Store,
    createStore
} from 'redux';

interface AppState {
    messages: string[];
}

interface AddMessageAction extends Action {
    message: string;
}

interface DeleteMessageAction extends Action {
    index: number;
}

class MessageActions {
    static addMessage(message: string): AddMessageAction {
        return {
            type: 'ADD_MESSAGE',
            message: message
        };
    }
    static deleteMessage(index: number): DeleteMessageAction {
        return {
            type: 'DELETE_MESSAGE',
            index: index
        };
    }
}



let initialState: AppState = { messages: [] };
let realReducer: Reducer<AppState> = (state: AppState = initialState, action: Action): AppState => {
    switch (action.type) {
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
                    ...state.messages.slice(idx + 1, state.messages.length)
                ]
            }
        default:
            return state;
    }
}

let myRealstore = createStore<AppState>(realReducer);
console.log(myRealstore.getState());


myRealstore.dispatch(MessageActions.addMessage('Would you say the fringe was made of silk?'))
myRealstore.dispatch(MessageActions.addMessage('Wouldnt have no other kind but silk'))
myRealstore.dispatch(MessageActions.addMessage('Would you say the fringe was made of silk?'))
myRealstore.dispatch(MessageActions.addMessage('Has it really got a team of snow white horses?'))

console.log(myRealstore.getState());