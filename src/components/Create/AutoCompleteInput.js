/* eslint-disable no-use-before-define */
/* eslint-disable no-use-before-define */
import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import {
  AutocompleteWrestler,
  AutocompleteTournament,
} from "../../controllers/search";

export default function Playground({ database, label, setValu }) {
  const [options, setOptions] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    try {
      const set = async () => {
        if (query.length > 0) {
          const fetch =
            database === "tournament"
              ? await AutocompleteTournament(query)
              : await AutocompleteWrestler(query);

          if (fetch.length > 0) {
            setOptions(fetch);
          }
        }
      };
      set();
    } catch (e) {
      console.log(e);
    }
  }, [query]);

  const defaultProps = {
    options: options,
    getOptionLabel: option => option.title,
  };

  const flatProps = {
    options: options.map(option => option.title),
  };

  const [value, setValue] = React.useState(null);
  return (
    <div style={{ width: 250 }}>
      <Autocomplete
        {...defaultProps}
        id='controlled-demo'
        debug
        onChange={(e, newValue) => {
          newValue && setValu(newValue.id);
        }}
        renderInput={params => (
          <TextField
            {...params}
            onChange={e => setQuery(e.target.value)}
            label={label}
            margin='normal'
          />
        )}
      />
      {/* <Autocomplete
        {...defaultProps}
        id='disable-close-on-select'
        disableCloseOnSelect
        renderInput={params => (
          <TextField {...params} label='disableCloseOnSelect' margin='normal' />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id='clear-on-escape'
        clearOnEscape
        renderInput={params => (
          <TextField {...params} label='clearOnEscape' margin='normal' />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id='disable-clearable'
        disableClearable
        renderInput={params => (
          <TextField {...params} label='disableClearable' margin='normal' />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id='include-input-in-list'
        includeInputInList
        renderInput={params => (
          <TextField {...params} label='includeInputInList' margin='normal' />
        )}
      />
      <Autocomplete
        {...flatProps}
        id='flat-demo'
        renderInput={params => (
          <TextField {...params} label='flat' margin='normal' />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id='controlled-demo'
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        renderInput={params => (
          <TextField {...params} label='controlled' margin='normal' />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id='auto-complete'
        autoComplete
        includeInputInList
        renderInput={params => (
          <TextField {...params} label='autoComplete' margin='normal' />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id='disable-list-wrap'
        disableListWrap
        renderInput={params => (
          <TextField {...params} label='disableListWrap' margin='normal' />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id='open-on-focus'
        openOnFocus
        renderInput={params => (
          <TextField {...params} label='openOnFocus' margin='normal' />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id='auto-highlight'
        autoHighlight
        renderInput={params => (
          <TextField {...params} label='autoHighlight' margin='normal' />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id='auto-select'
        autoSelect
        renderInput={params => (
          <TextField {...params} label='autoSelect' margin='normal' />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id='disabled'
        disabled
        renderInput={params => (
          <TextField {...params} label='disabled' margin='normal' />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id='disable-portal'
        disablePortal
        renderInput={params => (
          <TextField {...params} label='disablePortal' margin='normal' />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id='blur-on-select'
        blurOnSelect
        renderInput={params => (
          <TextField {...params} label='blurOnSelect' margin='normal' />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id='clear-on-blur'
        clearOnBlur
        renderInput={params => (
          <TextField {...params} label='clearOnBlur' margin='normal' />
        )}
      />
      <Autocomplete
        {...defaultProps}
        id='select-on-focus'
        selectOnFocus
        renderInput={params => (
          <TextField {...params} label='selectOnFocus' margin='normal' />
        )}
      /> */}
    </div>
  );
}
