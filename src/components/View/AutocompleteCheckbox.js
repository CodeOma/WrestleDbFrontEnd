/* eslint-disable no-use-before-define */

import React from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function CheckboxesTags({ options, setFunction }) {
  return (
    <Autocomplete
      multiple
      id='checkboxes-tags-demo'
      options={options}
      disableCloseOnSelect
      getOptionLabel={option => option}
      renderOption={(option, { selected }) => (
        <React.Fragment>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option}
        </React.Fragment>
      )}
      style={{
        width: "100%",
        maxHeight: "12vw",
        overflow: "scroll",
        paddingTop: 10,
      }}
      renderInput={params => (
        <TextField
          {...params}
          variant='outlined'
          label='Setups/Tags'
          placeholder='Tags'
        />
      )}
    />
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
// const top100Films = [
//   "The Shawshank Redemption",
//   "The Godfather",
//   "The Godfather: Part II",
//   "The Dark Knight",
//   "12 Angry Men",
//   "Schindler's List",
//   "Pulp Fiction",
// ];
