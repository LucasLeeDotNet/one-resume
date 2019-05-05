//React
import React, { SyntheticEvent, useContext, useEffect } from 'react';

//Context
import { StoreContext } from '../../../context/StoreContext';

//Material UI
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

//Styles
import './ExportDialog.component.scss';

declare var navigator: NavigatorModel;

export interface ExportDialogComponentModel{ 
  openState: boolean,
  onClose: ( event:SyntheticEvent )=>void,
}

interface NavigatorModel{ 
  clipboard: any;
}

export const ExportDialogComponent = ( props: ExportDialogComponentModel ) => { 
  const { state, dispatch, actions } = useContext(StoreContext);
  const { openState, onClose } = props;
  
  const exportPrefix = `
  /**
   * Replace the content of this file (/src/manifest.ts) with the manifest data copied by the export button
   */
  import ManifestModel from './models/ManifestModel';
  
  export const manifest:ManifestModel = `
  const handleCopyEvent = () => { 
    navigator.clipboard.writeText(exportPrefix + JSON.stringify({intro: state.intro, skills: state.skills, experiences: state.experiences}, null, 4)).then(function() {
      actions.snackbar( 'Manifest copied to clipboard' );
    }, function() {
      actions.snackbar( 'Manifest copy to clipboard failed, try manually copy and paste the manifest' );
    });
  }
  return ( 
    <Dialog
      className="export-dialog"
      open={openState}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Export Manifest Data</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <pre className="export-data">{exportPrefix + JSON.stringify({intro: state.intro, skills: state.skills, experiences: state.experiences}, null, 4)}</pre>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCopyEvent} color="primary">
          Copy to Clipboard
        </Button>
        <Button onClick={onClose} color="primary" autoFocus>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}