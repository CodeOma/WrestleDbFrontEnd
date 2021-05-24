/* eslint-disable no-use-before-define */
import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import Create from "../../pages/Create";
import Autocomplete, {
  createFilterOptions,
} from "@material-ui/lab/Autocomplete";
import {
  wrestlerFormatter,
  titleCase,
  tournamentFormatter,
} from "../../helpers/formatting";
import {
  userCreateTournament,
  userCreateWrestler,
} from "../../controllers/manage/create";
import {
  userAutocompleteWrestler,
  userAutocompleteTournament,
  // AutocompleteTags,
} from "../../controllers/manage/usersearch";
const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog({
  label,
  dialog,
  fn,
  state,
  name,
  database,
}) {
  const [query, setQuery] = useState("");

  const [value, setValue] = React.useState({});
  const [newTournament, setNewTournament] = React.useState({
    type: "",
    year: "",
    location: {
      city: "",
      country: "",
    },
    name: "",
  });
  const [newWrestler, setNewWrestler] = React.useState({
    id: "",
    fullName: "",
    lastName: "",
    team: "",
  });
  const [options, setOptions] = useState([]);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    setDialogValue({
      title: "",
      year: "",
    });
    toggleOpen(false);
  };

  const [dialogValue, setDialogValue] = React.useState({
    title: "",
    year: "",
  });

  const handleSubmit = event => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
      id: "",
    });

    handleClose();
  };
  useEffect(() => {
    const set = async () => {
      try {
        if (query.length > 0) {
          const fetch =
            database === "tournament"
              ? await userAutocompleteTournament(query)
              : await userAutocompleteWrestler(query);

          if (fetch.length > 0) {
            setOptions(fetch);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    set();
  }, [query]);
  useEffect(() => {
    setNewTournament({
      ...newTournament,
      name: `${newTournament.year} ${newTournament.type}`,
    });
  }, [newTournament.year, newTournament.type]);
  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === "string") {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                title: newValue,
                id: "",
              });

              if (dialog.title === "Add a Wrestler") {
                setNewWrestler({
                  ...newWrestler,
                  fullName: newValue,
                });
              }
              if (dialog.title === "Create Tournament") {
                setNewTournament({
                  ...newTournament,
                  type: newValue,
                });
              }
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              title: newValue.inputValue,
              id: "",
            });
          } else if (name && newValue && state) {
            setValue(newValue);
            console.log(name, newValue, state);
            console.log(newWrestler);
            if (dialog.title === "Add a Wrestler") {
              if (name && newValue.title) {
                fn({
                  ...state,
                  [name]: newValue.title || "",
                  [`${name}Id`]: newValue.id || "",
                });
              }
            }
            if (dialog.title === "Create Tournament") {
              fn({ ...state, [name]: newTournament.name });
            }
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== "") {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id='free-solo-dialog-demo'
        options={options}
        getOptionLabel={option => {
          try {
            // e.g value selected with enter, right from the input
            if (typeof option === "string") {
              return option;
            }
            if (option.inputValue) {
              return option.inputValue;
            }
            if (option.title === undefined) {
              return "";
            }
            return option.title;
          } catch (e) {
            console.log(e);
          }
        }}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={option => option.title}
        style={{ width: "100%" }}
        freeSolo
        renderInput={params => (
          <TextField
            {...params}
            onChange={e => setQuery(e.target.value)}
            label={label}
            variant='outlined'
          />
        )}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
      >
        {dialog.title === "Add a Wrestler" ? (
          <form onSubmit={handleSubmit}>
            <DialogTitle id='form-dialog-title'> {dialog.title} </DialogTitle>
            <DialogContent>
              <DialogContentText>{dialog.contentText} </DialogContentText>

              <TextField
                autoFocus
                margin='dense'
                id='name'
                value={dialogValue.title}
                onChange={event => {
                  setDialogValue({ ...dialogValue, title: event.target.value });

                  setNewWrestler({
                    ...newWrestler,
                    fullName: event.target.value,
                  });
                }}
                label='Full Name'
                type='text'
              />
              <TextField
                margin='dense'
                id='name'
                value={newWrestler.lastName}
                onChange={event =>
                  setNewWrestler({
                    ...newWrestler,
                    lastName: event.target.value,
                  })
                }
                label='Last Name'
                type='text'
              />
              <TextField
                margin='dense'
                id='name'
                value={newWrestler.team}
                onChange={event =>
                  setNewWrestler({ ...newWrestler, team: event.target.value })
                }
                label='Team'
                type='text'
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log("Send create wrestler");
                  const newWres = wrestlerFormatter(newWrestler);
                  userCreateWrestler(newWres);
                }}
                type='submit'
                color='primary'
              >
                Add
              </Button>
            </DialogActions>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogTitle id='form-dialog-title'> {dialog.title} </DialogTitle>
            <DialogContent>
              <Grid>
                <DialogContentText>{dialog.contentText} </DialogContentText>

                <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  value={newTournament.name}
                  onChange={event => {
                    setDialogValue({
                      ...dialogValue,
                      title: event.target.value,
                    });

                    setNewTournament({
                      ...newTournament,
                      name: `${newTournament.year} ${newTournament.type}`,
                    });
                  }}
                  label='Name'
                  type='text'
                />
              </Grid>
              <TextField
                margin='dense'
                id='name'
                value={newTournament.type}
                onChange={event =>
                  setNewTournament({
                    ...newTournament,
                    type: event.target.value,
                  })
                }
                label='Type'
                type='text'
              />
              <TextField
                margin='dense'
                id='name'
                value={newTournament.year}
                onChange={event =>
                  setNewTournament({
                    ...newTournament,
                    year: parseInt(event.target.value),
                  })
                }
                label='Year'
                type='text'
              />
              <TextField
                margin='dense'
                id='name'
                value={newTournament.location.country}
                onChange={event =>
                  setNewTournament({
                    ...newTournament,
                    location: {
                      ...newTournament.location,
                      country: event.target.value,
                    },
                  })
                }
                label='Country'
                type='text'
              />
              <TextField
                margin='dense'
                id='name'
                label='City'
                value={newTournament.location.city}
                onChange={event =>
                  setNewTournament({
                    ...newTournament,
                    location: {
                      ...newTournament.location,
                      city: event.target.value,
                    },
                  })
                }
                type='text'
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color='primary'>
                Cancel
              </Button>
              <Button
                onClick={() => {
                  if (dialog.title === "Create Tournament") {
                    const tournament = tournamentFormatter(newTournament);
                    userCreateTournament(tournament);
                  }
                }}
                type='submit'
                color='primary'
              >
                Add
              </Button>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </React.Fragment>
  );
}
