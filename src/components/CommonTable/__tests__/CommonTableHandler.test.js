import { renderHook, act } from '@testing-library/react-hooks';

import CommonTableHandler from '../CommonTableHandler';

import Constant from '../../../constants/Constant';

const mockData = [
  {
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

describe('Common Table Handler - handleChangePage', () => {
  it('Should set setPage to a new page', () => {
    const { result } = renderHook(() => CommonTableHandler());

    const mockExpectedValue = 1;
    const mockParam = mockExpectedValue;

    act(() => result.current.handleChangePage(null, mockParam));
    expect(result.current.page).toEqual(mockExpectedValue);
  });
});

describe('Common Table Handler - handleChangeRowsPerPage', () => {
  it('Should set rowsPerPage and page to default page', () => {
    const { result } = renderHook(() => CommonTableHandler());

    const mockExpectedValue = 25;
    const mockParam = { target: { value: mockExpectedValue } };
    act(() => result.current.handleChangeRowsPerPage(mockParam));

    expect(result.current.rowsPerPage).toEqual(mockExpectedValue);
    expect(result.current.page).toEqual(Constant.DEFAULT_PAGE);
  });
});

describe('Common Table Handler - handleRequestSort', () => {
  it('Should set order to asc/desc and orderBy to equal param', () => {
    const { result } = renderHook(() => CommonTableHandler());

    const mockExpectedValue = 'createdAt';
    const mockParam = mockExpectedValue;
    act(() => result.current.handleRequestSort(mockParam));

    expect(result.current.order).toEqual('asc');
    expect(result.current.orderBy).toEqual(mockExpectedValue);
  });
});

describe('Common Table Handler - descendingComparator', () => {
  it('Should set descendingComparator to -1', () => {
    const { result } = renderHook(() => CommonTableHandler());

    const mockExpectedValue = -1;
    const mockParam = {
      createdAt: 2
    };
    const mockParam2 = {
      createdAt: 1
    };

    const response = result.current.descendingComparator(mockParam, mockParam2);

    expect(response).toEqual(mockExpectedValue);
  });

  it('Should set descendingComparator to 1', () => {
    const { result } = renderHook(() => CommonTableHandler());

    const mockExpectedValue = 1;
    const mockParam = {
      createdAt: 1
    };
    const mockParam2 = {
      createdAt: 2
    };

    const response = result.current.descendingComparator(mockParam, mockParam2);

    expect(response).toEqual(mockExpectedValue);
  });

  it('Should set descendingComparator to 0', () => {
    const { result } = renderHook(() => CommonTableHandler());

    const mockExpectedValue = 0;
    const mockParam = {
      createdAt: 1
    };
    const mockParam2 = {
      createdAt: 1
    };

    const response = result.current.descendingComparator(mockParam, mockParam2);

    expect(response).toEqual(mockExpectedValue);
  });
});

describe('Common Table Handler - handleCloseModal', () => {
  it('Should set isOpenModal to false', () => {
    const { result } = renderHook(() => CommonTableHandler());

    act(() => result.current.handleCloseModal());

    expect(result.current.isOpenModal).toEqual(false);
  });
});

describe('Common Table Handler - handleCellClick', () => {
  it('Should set selectedModalData to selected object & isOpenModal to true', () => {
    const { result } = renderHook(() => CommonTableHandler());

    const mockExpectedValue = mockData;
    const mockParam = mockExpectedValue;
    act(() => result.current.handleCellClick(mockParam));

    expect(result.current.selectedModalData).toEqual(mockExpectedValue);
    expect(result.current.isOpenModal).toEqual(true);
  });
});

describe('Common Table Handler - handleCloseConfirmationModal', () => {
  it('Should set isOpenConfirmationModal to false', () => {
    const { result } = renderHook(() => CommonTableHandler());

    const mockExpectedValue = false;
    act(() => result.current.handleCloseConfirmationModal());

    expect(result.current.isOpenConfirmationModal).toEqual(mockExpectedValue);
  });
});

describe('Common Table Handler - handleConfirmAction', () => {
  it('Should call CB function and set isOpenConfirmationModal to false', () => {
    const { result } = renderHook(() => CommonTableHandler());

    const mockParam = jest.fn();
    act(() => result.current.handleConfirmAction(mockParam));

    expect(mockParam).toBeCalled();
    expect(result.current.isOpenConfirmationModal).toEqual(false);
  });
});

describe('Common Table Handler - handleAction', () => {
  it('Should set selectedData and isOpenConfirmationModal to false', () => {
    const { result } = renderHook(() => CommonTableHandler());

    const mockExpectedValue = mockData;
    const mockParam = mockExpectedValue;
    act(() => result.current.handleAction(mockParam));

    expect(result.current.selectedModalData).toEqual(mockExpectedValue);
    expect(result.current.isOpenConfirmationModal).toEqual(true);
  });
});
