import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Paper
} from '@mui/material';
import PropTypes from 'prop-types';

// Common Modal Component
const CommonModal = ({
  isOpen,
  handleClose,
  handleConfirm,
  title,
  description,
  isConfirmationButtonVisible
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
    >
      <Paper sx={{ p: 1 }}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {description}
          </DialogContentText>
        </DialogContent>
        {isConfirmationButtonVisible && (
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleConfirm} variant="contained">
              Confirm
            </Button>
          </DialogActions>
        )}
      </Paper>
    </Dialog>
  );
};

export default CommonModal;

CommonModal.defaultProps = {
  isOpen: false,
  handleClose: () => {},
  title: '',
  description: '',
  isConfirmationButtonVisible: false,
  handleConfirm: () => {}
};

CommonModal.propTypes = {
  isOpen: PropTypes.bool,
  handleClose: PropTypes.func,
  title: PropTypes.string,
  description: PropTypes.string,
  isConfirmationButtonVisible: PropTypes.bool,
  handleConfirm: PropTypes.func
};
