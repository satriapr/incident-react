import { useState, useEffect, useCallback } from 'react';
import { get } from 'lodash';

import IncidentService from '../../services/IncidentService';
import UserService from '../../services/UserService';
import Constant from '../../constants/Constant';

// Home Handler. Contain business logic
const HomeHandler = () => {
  const [incidents, setIncidents] = useState([]);
  const [users, setUsers] = useState([]);

  // Selected user from option dropwdown
  const [selectedUser, setSelectedUser] = useState({});

  // Filter status
  const [selectedStatus, setSelectedStatus] = useState(Constant.ALL);

  // Modal Create
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Trigger getIncidents every filter change
  const getIncidents = useCallback(async () => {
    try {
      const filter = {
        status: selectedStatus === Constant.ALL ? '' : selectedStatus
      };
      const response = await IncidentService.getIncidents(filter);
      setIncidents(get(response, 'data', []));
    } catch (err) {
      throw new Error(get(err, 'message', 'HomeHandler.getIncidents'));
    }
  }, [selectedStatus]);

  useEffect(() => {
    getIncidents();
  }, [getIncidents, selectedStatus]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await UserService.getUsers();
      const data = get(response, 'data', []);
      setUsers(data);
      setSelectedUser({
        index: 0,
        data: data[0]
      });
    } catch (err) {
      throw new Error(get(err, 'message', 'HomeHandler.getIncidents'));
    }
  };

  const deleteIncident = async (data) => {
    try {
      await IncidentService.deleteIncident(get(data, '_id', ''));
      getIncidents();
    } catch (err) {
      throw new Error(get(err, 'message', 'HomeHandler.getIncidents'));
    }
  };

  const updateIncidentStatus = async (data, status) => {
    try {
      const newData = { ...data, newStatus: status };
      await IncidentService.updateIncidentStatus(newData);
      getIncidents();
    } catch (err) {
      throw new Error(get(err, 'message', 'HomeHandler.getIncidents'));
    }
  };

  const createIncident = async (data) => {
    try {
      await IncidentService.createIncident(data);
      getIncidents();
    } catch (err) {
      throw new Error(get(err, 'message', 'HomeHandler.getIncidents'));
    }
  };

  const handleCloseModal = (reset) => {
    setIsOpenModal(false);
    reset();
  };

  /* Call API and close modal on submit */
  const handleSubmitModal = (data, reset) => {
    const newData = { ...data, reportedBy: get(selectedUser, 'data._id', '') };
    createIncident(newData);
    setIsOpenModal(false);
    reset();
  };

  /* Select current user from dropdown */
  const handleSelectUser = (selectedIndex) => {
    setSelectedUser({
      index: selectedIndex,
      data: users[selectedIndex]
    });
  };

  const handleSelectStatus = (status) => setSelectedStatus(status);

  return {
    users,
    setUsers,
    getUsers,
    setSelectedUser,
    incidents,
    setIncidents,
    getIncidents,
    deleteIncident,
    createIncident,
    updateIncidentStatus,
    isOpenModal,
    handleCloseModal,
    handleSubmitModal,
    setIsOpenModal,
    handleSelectUser,
    selectedUser,
    setSelectedStatus,
    selectedStatus,
    handleSelectStatus
  };
};

export default HomeHandler;
