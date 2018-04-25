import { Store } from './identity-reducer'

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
        }
    };
    static deleteMessage(index: number): DeleteMessageAction {
        return {
            type: 'DELETE_MESSAGE',
            index: index
        }
    };
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

let mystore = new Store<AppState>(myreducer, {messages: [] });


mystore.dispatch(MessageActions.addMessage('Would you say the fringe was made of silk?'))
mystore.dispatch(MessageActions.addMessage('Wouldnt have no other kind but silk'))
mystore.dispatch(MessageActions.addMessage('Would you say the fringe was made of silk?'))
mystore.dispatch(MessageActions.addMessage('Has it really got a team of snow white horses?'))

console.log(mystore.getState());