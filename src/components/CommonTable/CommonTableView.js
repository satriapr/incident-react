/* eslint-disable no-else-return */
import React from 'react';
import {
  Table,
  TableSortLabel,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Button
} from '@mui/material';
import { Delete } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { get, isEmpty } from 'lodash';
import moment from 'moment';

import CommonTableHandler from './CommonTableHandler';
import CommonModal from '../CommonModal/CommonModalView';

import Constant from '../../constants/Constant';

// Common Table component. Used to render table contain list of data
const CommonTable = (props) => {
  const {
    rows,
    cells,
    selectedUser,
    handleDeleteCB,
    handleAcknowledgeCB,
    handleResolveCB
  } = props;

  const {
    order,
    orderBy,
    page,
    rowsPerPage,
    handleRequestSort,
    getComparator,
    handleChangePage,
    handleChangeRowsPerPage,
    handleCellClick,
    isOpenModal,
    selectedModalData,
    handleCloseModal,
    handleAction,
    handleConfirmAction,
    isOpenConfirmationModal,
    handleCloseConfirmationModal
  } = CommonTableHandler();

  // Render Action Button. ToDo: We can separate to separated component and make it more flexible
  const renderAction = (row) => {
    /* If admin, show delete button */
    if (get(selectedUser, 'data.role') === Constant.ADMIN) {
      const confirmationModalData = {
        title: 'Delete Confirmation',
        description: `Are you sure to delete "${get(row, 'title', '')}"?`,
        rowData: row,
        action: (rowData) => handleDeleteCB(rowData)
      };

      return (
        <IconButton
          onClick={() => handleAction(confirmationModalData)}
          color="inherit"
        >
          <Delete />
        </IconButton>
      );
    } else if (
      /* If NOT admin, show action based on status and assignee.
        User can only change status if being assigned.

        ToDo: This is only a helper to simulate different user for the test.
        Normally we need to build auth and login page.
      */
      get(selectedUser, 'data.role') === Constant.USER &&
      get(selectedUser, 'data._id') === get(row, 'assignee._id')
    ) {
      if (get(row, 'status') === Constant.OPEN) {
        const newStatus = Constant.IN_PROGRESS;
        const confirmationModalData = {
          title: 'Acknowledge Confirmation',
          description: `Are you sure to acknowledge "${get(
            row,
            'title',
            ''
          )}"? Incident status will be changed to "In Progress"`,
          rowData: row,
          action: (rowData) => handleAcknowledgeCB(rowData, newStatus)
        };

        return (
          <Button
            onClick={() => handleAction(confirmationModalData)}
            color="inherit"
          >
            Acknowledge
          </Button>
        );
      } else if (get(row, 'status') === Constant.IN_PROGRESS) {
        const newStatus = Constant.RESOLVED;
        const confirmationModalData = {
          title: 'Resolve Confirmation',
          description: `Are you sure to resolve "${get(
            row,
            'title',
            ''
          )}"? Incident status will be changed to "Resolved"`,
          rowData: row,
          action: (rowData) => handleResolveCB(rowData, newStatus)
        };

        return (
          <Button
            onClick={() => handleAction(confirmationModalData)}
            color="inherit"
          >
            Mark as Resolved
          </Button>
        );
      }
    }

    return null;
  };

  const renderCellData = (valueCell, row) => {
    // valueCell = parameter/key
    // row = actual data
    const rowData = get(row, `${get(valueCell, 'value', '')}`, '-');
    return (
      <TableCell key={get(valueCell, 'id', '')}>
        {get(valueCell, 'isClickable') ? (
          <Button
            onClick={() => (valueCell.isClickable ? handleCellClick(row) : {})}
            color="secondary"
          >
            {get(valueCell, 'isDate')
              ? moment(rowData).format('DD MM YYYY HH:mm:ss')
              : rowData}
          </Button>
        ) : (
          // eslint-disable-next-line react/jsx-no-useless-fragment
          <>
            {get(valueCell, 'isDate')
              ? moment(rowData).format('DD MMM YYYY HH:mm:ss')
              : rowData}
          </>
        )}
      </TableCell>
    );
  };

  return (
    <>
      <TableContainer>
        <Table stickyHeader aria-label="sticky table" size="medium">
          <TableHead>
            <TableRow>
              {/* Render title */}
              {cells.map((headCell) => (
                <TableCell
                  key={get(headCell, 'id')}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  {headCell.isSort ? (
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={() => handleRequestSort(headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  ) : (
                    headCell.label
                  )}
                </TableCell>
              ))}
              {/* Action */}
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Render content */}
            {!isEmpty(rows) &&
              rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(getComparator())
                .map((row) => (
                  <TableRow hover key={get(row, '_id', '')}>
                    {/* Render cell data */}
                    {cells.map((valueCell) => renderCellData(valueCell, row))}

                    {/* Render action button */}
                    <TableCell>{renderAction(row)}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={Constant.ROWS_PER_PAGE_OPTIONS}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>

      {/* Detail Modal */}
      <CommonModal
        isOpen={isOpenModal}
        handleClose={handleCloseModal}
        title={get(selectedModalData, 'title', '')}
        description={get(selectedModalData, 'description', '')}
      />

      {/* Delete Confirmation Modal */}
      <CommonModal
        isOpen={isOpenConfirmationModal}
        handleClose={handleCloseConfirmationModal}
        handleConfirm={() =>
          handleConfirmAction(get(selectedModalData, 'action', () => {}))
        }
        title={get(selectedModalData, 'title', '')}
        description={get(selectedModalData, 'description', '')}
        isConfirmationButtonVisible
      />
    </>
  );
};

export default CommonTable;

CommonTable.defaultProps = {
  rows: [],
  cells: [
    {
      id: '',
      label: '',
      value: ''
    }
  ],
  selectedUser: {},
  handleDeleteCB: () => {},
  handleAcknowledgeCB: () => {},
  handleResolveCB: () => {}
};

CommonTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object),
  cells: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      value: PropTypes.string
    })
  ),
  selectedUser: PropTypes.objectOf(PropTypes.any),
  handleDeleteCB: PropTypes.func,
  handleAcknowledgeCB: PropTypes.func,
  handleResolveCB: PropTypes.func
};
