const Constant = {
  API_BASE_URL: 'http://localhost:5000',
  REQUEST_TIME_OUT: 10000,
  DEFAULT_PAGE: 0,
  DEFAULT_ROWS_PER_PAGE: 10,
  ROWS_PER_PAGE_OPTIONS: [10, 25, 100],
  ADMIN: 'admin',
  USER: 'user',
  OPEN: 'Open',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
  ALL: 'All',
  CELLS_DATA: [
    {
      id: 'priorityIndex',
      label: 'Priority',
      value: 'priorityLabel',
      isSort: true,
      isClickable: false
    },
    {
      id: 'title',
      label: 'Title',
      value: 'title',
      isSort: false,
      isClickable: true
    },
    {
      id: 'statusIndex',
      label: 'Status',
      value: 'status',
      isSort: false,
      isClickable: false
    },
    {
      id: 'assignee._id',
      label: 'Assignee',
      value: 'assignee.fullName',
      isSort: false,
      isClickable: false
    },
    {
      id: 'reportedBy._id',
      label: 'Reported By',
      value: 'reportedBy.fullName',
      isSort: false,
      isClickable: false
    },
    {
      id: 'createdAt',
      label: 'Created At',
      value: 'createdAt',
      isSort: true,
      isClickable: false,
      isDate: true
    }
  ]
};

export default Constant;
