import React, { createContext, useReducer } from 'react';
import { reducer } from './reducers';
import { initialState } from './initialState';
import { useActions } from './actions';

interface IStoreProvider{ 
  children: JSX.Element;
}

//Create the reducer
const [state, dispatch] = useReducer( reducer, initialState );

//Create a action handler
const actions = useActions( state, dispatch );

//Create the initial value for the new context
const InitialStoreProviderValue = { state, dispatch, actions };

//Create the context
const StoreContext = createContext( InitialStoreProviderValue );

const StoreProvider = ( { children }: IStoreProvider): JSX.Element => { 
  return( 
    <StoreContext.Provider value={InitialStoreProviderValue}>
      {children}
    </StoreContext.Provider>
  )
};

export { StoreContext, StoreProvider };