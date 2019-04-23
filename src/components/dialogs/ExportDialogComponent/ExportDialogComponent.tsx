import React, { SyntheticEvent, useContext, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { ManifestModel } from '../../../context/initialState';
import { StoreContext } from '../../../context/StoreContext';
import './ExportDialogComponent.scss';

export interface ExportDialogComponentModel{ 
  openState: boolean,
  onClose: ( event:SyntheticEvent )=>void,
  manifest?: ManifestModel
}

export const ExportDialogComponent = ( props: ExportDialogComponentModel ) => { 
  const { state, dispatch, actions } = useContext(StoreContext);
  const { openState, onClose } = props;

  return ( 
    <Dialog
      open={openState}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Export Manifest Datra</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <pre className="export-data">{JSON.stringify({intro: state.intro, skills: state.skills, experinces: state.experinces}, null, 4)}</pre>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Copy to Clipboard
        </Button>
        <Button onClick={onClose} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}