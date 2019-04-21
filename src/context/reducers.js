  import { initialState } from './initialState';
  
  const types = {
      TOGGLE_EDIT: 'TOGGLE_EDIT',
      UPDATE_STATEMENT: 'UPDATE_STATEMENT'
  };

  const reducer = (state = initialState, action) => {
      console.log({
          oldState: state,
          type: action.type,
          payload: action.payload
      });
      switch (action.type) {
          case types.TOGGLE_EDIT:
              return {
                  ...state,
                  editMode: action.editMode
              }
            case types.UPDATE_STATEMENT: 
            console.log( { 
                ...state,
                intro: { 
                    ...state.intro,
                    statement: action.statement
                }
            });
              return { 
                  ...state,
                  intro: { 
                      ...state.intro,
                      statement: action.statement
                  }
              }
          default:
              throw new Error('Unexpected action');
      }
  };
  
  export {
      initialState,
      types,
      reducer
  };