import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { get } from 'lodash';

// Common form input dropdown. React-hook-form
const FormInputDropdown = ({ name, control, label, options }) => {
  const generateSelectOptions = () => {
    return options.map((option) => {
      return (
        <MenuItem
          key={get(option, 'value', '')}
          value={get(option, 'value', '')}
        >
          {option.label}
        </MenuItem>
      );
    });
  };

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: `${label} is required` }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          onChange={onChange}
          value={value || value === 0 ? value : ''}
          error={!!error}
          helperText={error ? error.message : null}
          select
          label={label}
          required
          fullWidth
        >
          {generateSelectOptions()}
        </TextField>
      )}
    />
  );
};

export default FormInputDropdown;

FormInputDropdown.defaultProps = {
  name: '',
  control: {},
  label: '',
  options: []
};

FormInputDropdown.propTypes = {
  name: PropTypes.string,
  control: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object)
};
