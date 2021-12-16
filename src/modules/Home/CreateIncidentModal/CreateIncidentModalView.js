import React from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  // DialogContentText,
  DialogActions,
  Paper,
  Grid
} from '@mui/material';
// import { Close } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { get } from 'lodash';

import Constant from '../../../constants/Constant';
import FormInputText from '../../../components/FormInputText/FormInputTextView';
import FormInputDropdown from '../../../components/FormInputDropdown/FormInputDropdownView';

// Component for create new Incident
const CreateIncidentModal = ({
  isOpen,
  handleCloseCB,
  handleSubmitCB,
  userOptions
}) => {
  const { handleSubmit, control, reset } = useForm();

  // Filter admin because admin can't be assignee
  const userOptionsWithoutAdmin = userOptions.filter(
    (user) => get(user, 'role') !== Constant.ADMIN
  );

  // ToDo: Normally we should get this data from API
  const priorityOptions = [
    {
      value: 0,
      label: 'Critical'
    },
    {
      value: 1,
      label: 'High'
    },
    {
      value: 2,
      label: 'Medium'
    },
    {
      value: 3,
      label: 'Low'
    }
  ];

  return (
    <Dialog
      open={isOpen}
      onClose={() => handleCloseCB(reset)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="lg"
    >
      <form>
        <Paper sx={{ p: 2, width: 600 }}>
          <DialogTitle id="alert-dialog-title">Create New Incident</DialogTitle>
          <br />
          <DialogContent>
            <Grid container direction="column" spacing={4}>
              <Grid item>
                <FormInputText name="title" control={control} label="Title" />
              </Grid>
              <Grid item>
                <FormInputText
                  name="description"
                  control={control}
                  label="Description"
                  isMultiline
                />
              </Grid>
              <Grid item>
                <FormInputDropdown
                  name="priorityIndex"
                  control={control}
                  label="Priority"
                  options={priorityOptions}
                />
              </Grid>
              <Grid item>
                <FormInputDropdown
                  name="assignee"
                  control={control}
                  label="Assignee"
                  options={userOptionsWithoutAdmin}
                />
              </Grid>
            </Grid>
          </DialogContent>
          {/* Logic for the action button located in Home Handler */}
          <DialogActions>
            <Button onClick={() => handleCloseCB(reset)}>Cancel</Button>
            <Button
              onClick={handleSubmit((data) => handleSubmitCB(data, reset))}
              variant="contained"
            >
              Submit
            </Button>
          </DialogActions>
        </Paper>
      </form>
    </Dialog>
  );
};

export default CreateIncidentModal;

CreateIncidentModal.defaultProps = {
  isOpen: false,
  handleCloseCB: () => {},
  handleSubmitCB: () => {},
  userOptions: []
};

CreateIncidentModal.propTypes = {
  isOpen: PropTypes.bool,
  handleCloseCB: PropTypes.func,
  handleSubmitCB: PropTypes.func,
  userOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string
    })
  )
};
