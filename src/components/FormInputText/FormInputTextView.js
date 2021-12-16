import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import React from 'react';

// Common form input text. React-hook-form
const FormInputText = ({ name, control, label, isMultiline }) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required: `${label} is required` }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          onChange={onChange}
          value={value || ''}
          label={label}
          error={!!error}
          helperText={error ? error.message : null}
          fullWidth
          variant="outlined"
          multiline={isMultiline}
          rows={isMultiline ? 4 : 0}
        />
      )}
    />
  );
};

export default FormInputText;

FormInputText.defaultProps = {
  name: '',
  control: {},
  label: '',
  isMultiline: false
};

FormInputText.propTypes = {
  name: PropTypes.string,
  control: PropTypes.objectOf(PropTypes.any),
  label: PropTypes.string,
  isMultiline: PropTypes.bool
};
