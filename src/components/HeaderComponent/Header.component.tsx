// React
import React, { SyntheticEvent, useContext, useEffect, useState } from "react";

// Material
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core";

// Material UI Icon
import DescriptionIcon from "@material-ui/icons/Description";
import EditIcon from "@material-ui/icons/Edit";
import ExportIcon from "@material-ui/icons/ImportExport";
import PrintIcon from "@material-ui/icons/Print";
import VisibilityIcon from "@material-ui/icons/Visibility";

// Component
import { ExportDialogComponent } from "../dialogs/ExportDialogComponent/ExportDialogComponent";

// State
import { types } from "../../context/reducers";
import { StoreContext } from "../../context/StoreContext";

// Style
import "./Header.style.scss";

const HeaderComponent = () => {
    const { state, dispatch, actions } = useContext(StoreContext);

    // local state
    const [ exportModalState, toggleExportModal ] = useState( false );

    /**
     * Opening of the export dialog is handled as a local state
     * @param event Object
     */
    const handleExportDialogClose = ( event: SyntheticEvent ): void => {
      toggleExportModal( false );
    };


    /**
     * Opens the export Dialog
     *
     */
    const handleOpenExportDialog = () => toggleExportModal( !exportModalState );


    /**
     * Toggle global export mode
     */
    const handletoggleEditMode = (): void => {
        dispatch( {
            editMode: !state.editMode,
            type: types.TOGGLE_EDIT,
        } );
    };


    /**
     * Remove toolbar for print out
     */
    const handlePrintModeClick = () => {
      actions.handlePrintModeToggle( true );
    };


    return (
        state.printMode ? <div/> :
        (
            <div className="header-container" >
                <AppBar position="static" color="default">
                    <Toolbar className="toolbar">
                        <Typography variant="h6" color="inherit"/>
                        <div className="spacer" />


                        {
                            /**
                             * Print Mode toggle
                             * -----------------
                             */
                        }
                        {/* <Button variant="contained" onClick={ handlePrintModeClick }>
                            <PrintIcon/> Hide Toolbar for Print
                        </Button> */}


                        {
                            /**
                             * Generate PDF Button
                             */
                        }
                        {/* <Button className="right-menu-button"variant="contained" onClick={ actions.handlePrintPdf }>
                            <DescriptionIcon/> Generate PDF (Has Issues)
                        </Button> */}


                        {
                            /**
                             * Export Data Button
                             * ------------------
                             */
                        }
                        <Button
                            className="right-menu-button"
                            variant="contained"
                            onClick={handleOpenExportDialog}
                        >
                            <ExportIcon/> Export Data
                        </Button>


                        {
                            /**
                             * Toggle for switching Edit and View Mode
                             * ---------------------------------------
                             */
                        }
                        <Button className="right-menu-button" variant="contained" onClick={handletoggleEditMode}>
                            {state.editMode ?
                                ["Edit Mode ", <EditIcon key="editMode" className="mode-icon"/>]
                                :
                                ["View Mode", <VisibilityIcon key="visibilityIcon" className="mode-icon"/>]}
                        </Button>


                    </Toolbar>
                </AppBar>
                <ExportDialogComponent onClose={handleExportDialogClose} openState={exportModalState} />
            </div>
        )
    );
};

export default HeaderComponent;
