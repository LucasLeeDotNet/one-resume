//React
import React, { useContext } from 'react';

//Context
import { StoreContext } from '../../context/StoreContext';
import { types } from '../../context/reducers';

//Material UI
import { IconButton, Snackbar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

//Model
import GenericSnackbarModel from '../../models/GenericSnackbarModel';

const GenericSnackbarComponent = () => { 
    const { state, dispatch, actions } = useContext( StoreContext );
    const genericSnackbar: GenericSnackbarModel = state.genericSnackbar;
    const { open, hideDuration, message } = genericSnackbar;



    /**
     * Close the generic snackbar
     */
    const handleClose = ():void => { 
      dispatch({ 
        type: types.HIDE_GENERIC_SNACKBAR
      })
    };

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={open}
          autoHideDuration={hideDuration}
          onClose={handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          message={<span id="message-id">{message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
      </div>
    );
};

export default GenericSnackbarComponent;