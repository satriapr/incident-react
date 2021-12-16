import { get } from 'lodash';

import axiosApi from './AxiosApiService';

const getIncidents = async (filter) => {
  const res = await axiosApi.get('/incidents', { params: filter });
  return get(res, 'data', []);
};

const deleteIncident = async (_id) => {
  await axiosApi.delete(`/incident/${_id}`);
};

const updateIncidentStatus = async (data) => {
  await axiosApi.put('/incident-status', data);
};

const createIncident = async (data) => {
  await axiosApi.post('/incident', data);
};

export default {
  getIncidents,
  deleteIncident,
  createIncident,
  updateIncidentStatus
};
