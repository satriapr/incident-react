import { get } from 'lodash';

import axiosApi from './AxiosApiService';

const getUsers = async () => {
  const res = await axiosApi.get('/users');
  return get(res, 'data', []);
};

export default {
  getUsers
};
