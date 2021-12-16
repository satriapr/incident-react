import { useState } from 'react';
import { get } from 'lodash';
import Constant from '../../constants/Constant';

// Common Table Handler. Contain business logic
const CommonTableHandler = () => {
  // Sorting and Pagination
  const [order, setOrder] = useState('desc'); // any to support MUI table prop
  const [orderBy, setOrderBy] = useState('createdAt');
  const [page, setPage] = useState(Constant.DEFAULT_PAGE);
  const [rowsPerPage, setRowsPerPage] = useState(
    Constant.DEFAULT_ROWS_PER_PAGE
  );

  // Common Modal
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedModalData, setSelectedModalData] = useState({});

  // Delete/Ack/Resolve confirmation modal
  const [isOpenConfirmationModal, setIsOpenConfirmationModal] = useState(false);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(Constant.DEFAULT_PAGE);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const descendingComparator = (a, b) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  };

  const getComparator = () => {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  };

  const handleCloseModal = () => setIsOpenModal(false);

  // Handle title click
  const handleCellClick = (selectedData) => {
    setSelectedModalData(selectedData);
    setIsOpenModal(true);
  };

  const handleCloseConfirmationModal = () => setIsOpenConfirmationModal(false);

  /* Action confirmation (submit) */
  const handleConfirmAction = (actionCB) => {
    /* Trigger action CB (delete/ack/resolve) */
    actionCB(get(selectedModalData, 'rowData', {}));
    setIsOpenConfirmationModal(false);
  };

  /* Action confirmation (ask) */
  const handleAction = (selectedData) => {
    setSelectedModalData(selectedData);
    setIsOpenConfirmationModal(true);
  };

  return {
    order,
    orderBy,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    handleRequestSort,
    getComparator,
    handleChangePage,
    handleChangeRowsPerPage,
    handleCellClick,
    isOpenModal,
    selectedModalData,
    handleCloseModal,
    descendingComparator,
    handleAction,
    handleConfirmAction,
    isOpenConfirmationModal,
    handleCloseConfirmationModal
  };
};

export default CommonTableHandler;
