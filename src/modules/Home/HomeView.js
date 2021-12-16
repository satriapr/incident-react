import React from 'react';
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Paper,
  Button,
  TextField,
  MenuItem,
  InputLabel
} from '@mui/material';
import { get } from 'lodash';

import HomeHandler from './HomeHandler';
import CreateIncidentModal from './CreateIncidentModal/CreateIncidentModalView';

import CommonTable from '../../components/CommonTable/CommonTableView';
import Constant from '../../constants/Constant';

// Home View. Business logic separated in handler
const Home = () => {
  const {
    users,
    incidents,
    deleteIncident,
    updateIncidentStatus,
    isOpenModal,
    handleCloseModal,
    handleSubmitModal,
    setIsOpenModal,
    handleSelectUser,
    selectedUser,
    selectedStatus,
    handleSelectStatus
  } = HomeHandler();

  const mdTheme = createTheme();

  /* Transform users data to satisfy component props */
  const userOptions = users
    .filter((user) => get(user, 'role'))
    .map((user) => {
      return {
        value: get(user, '_id', ''),
        label: get(user, 'fullName', ''),
        role: get(user, 'role', '')
      };
    });

  const generateUserOptions = () => {
    return userOptions.map((option, index) => {
      return (
        <MenuItem key={get(option, 'value', '')} value={index}>
          {option.label}
        </MenuItem>
      );
    });
  };

  /* ToDo: This status options should be coming from DB */
  const statusOptions = [
    Constant.ALL,
    Constant.OPEN,
    Constant.IN_PROGRESS,
    Constant.RESOLVED
  ];
  const generateStatusOptions = () => {
    return statusOptions.map((option) => {
      return (
        <MenuItem key={option} value={option}>
          {option}
        </MenuItem>
      );
    });
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute">
          <Toolbar>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Incident Dashboard
            </Typography>
            {/* Create button. Only Admin can create */}
            {get(selectedUser, 'data.role') === Constant.ADMIN && (
              <Button
                onClick={() => setIsOpenModal(true)}
                variant="contained"
                color="secondary"
              >
                Create
              </Button>
            )}
          </Toolbar>
        </AppBar>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item>
                <InputLabel>Filter by Status</InputLabel>
                <TextField
                  onChange={(e) => handleSelectStatus(e.target.value)}
                  value={selectedStatus || ''}
                  select
                  sx={{ width: 150 }}
                  variant="standard"
                  defaultValue={Constant.ALL}
                >
                  {generateStatusOptions()}
                </TextField>
              </Grid>
              <Grid item>
                {/* User selection dropdown. Just a helper because we don't have auth. */}
                <InputLabel>Selected User</InputLabel>
                <TextField
                  onChange={(e) => handleSelectUser(e.target.value)}
                  value={
                    get(selectedUser, 'index') ||
                    get(selectedUser, 'index') === 0
                      ? get(selectedUser, 'index')
                      : ''
                  }
                  select
                  sx={{ width: 150 }}
                  variant="standard"
                >
                  {generateUserOptions()}
                </TextField>
              </Grid>
              {/* Table List */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <CommonTable
                    rows={incidents}
                    cells={Constant.CELLS_DATA}
                    handleDeleteCB={deleteIncident}
                    handleAcknowledgeCB={updateIncidentStatus}
                    handleResolveCB={updateIncidentStatus}
                    selectedUser={selectedUser}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>

      {/* Create Modal */}
      <CreateIncidentModal
        isOpen={isOpenModal}
        handleCloseCB={(reset) => handleCloseModal(reset)}
        handleSubmitCB={(data, reset) => handleSubmitModal(data, reset)}
        userOptions={userOptions}
      />
    </ThemeProvider>
  );
};

export default Home;
