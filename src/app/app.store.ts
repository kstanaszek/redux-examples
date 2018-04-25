import { AppState } from "./app.state";
import { Store, createStore, compose, StoreEnhancer } from "redux";
import {
    counterReducer as reducer
  } from './counter.reducer';
import { InjectionToken } from "@angular/core";
  
const devtools: StoreEnhancer<AppState> =
  window['devToolsExtension'] ?
  window['devToolsExtension']() : f => f;


export function createAppStore(): Store<AppState> {
    return createStore<AppState>(reducer, compose(devtools))
}

export const AppStore = new InjectionToken('App.store')  ;
export const appStoreProviders = [
    { provide: AppStore, useFactory: createAppStore }
 ];
