/* eslint-disable no-use-before-define */

import React, { useEffect } from "react";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

export default function CheckboxesTags({
  value,
  options,
  setFunction,
  name,
  state,
}) {
  return (
    <Autocomplete
      value={value}
      multiple
      id='checkboxes-tags-demo'
      options={options}
      disableCloseOnSelect
      onChange={
        (e, value, reason) => {
          setFunction({
            ...state,
            takedown: { ...state.takedown, [name]: value },
          });
          // if (value[0]) {
          //   if (reason === "select-option") {
          //     setFunction({ takedown: { [name]: [...] } });
          //   } else if (reason === "remove-option") {
          //   } else if (reason === "clear") {
          //   }
        }
        // console.log(e.target.value, "value", value, reason);
        // if (value[0]) {
        //   setFunction(value[0].id);
        // }
      }
      getOptionLabel={option => option}
      renderOption={(option, stuff) => {
        return (
          <React.Fragment>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={stuff.selected}
            />
            {option}
          </React.Fragment>
        );
      }}
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
