import { renderHook, act } from '@testing-library/react-hooks';

import HomeHandler from '../HomeHandler';

import Constant from '../../../constants/Constant';
import IncidentService from '../../../services/IncidentService';
import UserService from '../../../services/UserService';

const mockData = [
  {
    _id: '61b77c635a84c35071e91e6d',
    title: 'test title',
    description: 'test detail',
    status: 'Open',
    priorityLabel: 'Critical',
    priorityIndex: 0,
    reportedBy: '222',
    assignee: '333',
    active: 1,
    createdAt: '2021-01-01 00:00:00',
    updatedAt: '2021-01-01 00:00:00'
  }
];

const mockUserData = [
  {
    fullName: 'User 1',
    role: 'admin'
  }
];

// Mock service
jest.mock('../../../services/IncidentService', () => ({
  getIncidents: jest.fn(),
  deleteIncident: jest.fn(),
  updateIncidentStatus: jest.fn(),
  createIncident: jest.fn()
}));

jest.mock('../../../services/UserService', () => ({
  getUsers: jest.fn()
}));

describe('Home Handler - getIncidents', () => {
  it('Should call getIncidents and setIncidents', async () => {
    const { result } = renderHook(() => HomeHandler());

    await act(() => result.current.getIncidents());

    expect(IncidentService.getIncidents).toBeCalled();

    act(() => result.current.setIncidents(mockData));
    expect(result.current.incidents).toEqual(mockData);
  });
});

describe('Home Handler - getUsers', () => {
  it('Should call getUsers', async () => {
    const { result } = renderHook(() => HomeHandler());

    await act(() => result.current.getUsers());

    expect(UserService.getUsers).toBeCalled();

    act(() => result.current.setUsers(mockUserData));
    expect(result.current.users).toEqual(mockUserData);

    const mockSelectedUser = {
      index: 0,
      data: mockUserData[0]
    };
    act(() => result.current.setSelectedUser(mockSelectedUser));
    expect(result.current.selectedUser).toEqual(mockSelectedUser);
  });
});

describe('Home Handler - deleteIncident', () => {
  it('Should call deleteIncident', async () => {
    const { result } = renderHook(() => HomeHandler());

    await act(() => result.current.deleteIncident(mockData));

    expect(IncidentService.deleteIncident).toBeCalled();
  });
});

describe('Home Handler - updateIncidentStatus', () => {
  it('Should call updateIncidentStatus', async () => {
    const { result } = renderHook(() => HomeHandler());

    await act(() => result.current.updateIncidentStatus());

    expect(IncidentService.updateIncidentStatus).toBeCalled();
  });
});

describe('Home Handler - createIncident', () => {
  it('Should call createIncident', async () => {
    const { result } = renderHook(() => HomeHandler());

    await act(() => result.current.createIncident());

    expect(IncidentService.createIncident).toBeCalled();
  });
});

describe('Home Handler - handleCloseModal', () => {
  it('Should set isOpenModal to false', () => {
    const { result } = renderHook(() => HomeHandler());

    const reset = jest.fn();
    act(() => result.current.handleCloseModal(reset));

    expect(result.current.isOpenModal).toEqual(false);
  });
});

describe('Home Handler - handleSubmitModal', () => {
  it('Should call createIncident and set isOpenModal to false', () => {
    const { result } = renderHook(() => HomeHandler());
    
    const data = {};
    const reset = jest.fn();

    act(() => result.current.handleSubmitModal(data, reset));
    act(() => result.current.setIsOpenModal(false));

    expect(result.current.isOpenModal).toEqual(false);
  });
});

describe('Home Handler - handleSelectUser', () => {
  it('Should call createIncident and set isOpenModal to false', () => {
    const { result } = renderHook(() => HomeHandler());

    const mockIndex = 0;
    const mockExpectedValue = {
      index: mockIndex,
      data: mockUserData[mockIndex]
    };
    act(() => result.current.handleSelectUser(mockIndex));

    act(() => result.current.setSelectedStatus(mockExpectedValue));
    expect(result.current.selectedStatus).toEqual(mockExpectedValue);
  });
});

describe('Home Handler - handleSelectStatus', () => {
  it('Should set selectedStatus', () => {
    const { result } = renderHook(() => HomeHandler());

    act(() => result.current.handleSelectStatus());

    act(() => result.current.setSelectedStatus(Constant.IN_PROGRESS));
    expect(result.current.selectedStatus).toEqual(Constant.IN_PROGRESS);
  });
});
