import React, { createContext, useReducer } from "react";
import IStateModel from "../models/StateModel";
import { IActionsModel, useActions } from "./actions";
import { initialState } from "./initialState";
import { reducer } from "./reducers";

interface IStoreProvider {
  children: JSX.Element;
}

interface IStoreContext {
  state: IStateModel;
  dispatch: React.Dispatch<any>;
  actions: IActionsModel;
}

let StoreContext: React.Context<IStoreContext>;

const StoreProvider = ( { children }: IStoreProvider): JSX.Element => {

  // Create the reducer
  const [state, dispatch] = useReducer( reducer, initialState );

  // Create a action handler
  const actions = useActions( state, dispatch );

  // Create the initial value for the new context
  const InitialStoreProviderValue = { state, dispatch, actions };

  // Create the context
  StoreContext = createContext( InitialStoreProviderValue );

  return(
    <StoreContext.Provider value={InitialStoreProviderValue}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
