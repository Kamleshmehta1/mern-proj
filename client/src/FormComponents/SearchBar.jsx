import { Autocomplete, TextField } from '@mui/material';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

function SearchBar({
  name,
  options,
  label,
  onInput,
  filterWith,
  renderOption,
  placeholder,
  filterSelectedOptions,
  ...other
}) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, ...field } }) => {
        return (
          <Autocomplete
            {...field}
            multiple
            options={options}
            fullWidth
            filterSelectedOptions={filterSelectedOptions}
            onInput={onInput}
            getOptionLabel={(option) => option?.[filterWith]}
            renderOption={renderOption}
            {...other}
            renderInput={(params) => (
              <TextField {...params} label={label} placeholder={placeholder} />
            )}
          />
        );
      }}
    />
  );
}

export default SearchBar;
