import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  TextField,
  FormHelperText,
  Card,
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import Select from "../../../components/Create/Selector";
import AutoComplete from "../../../components/Create/AutoCompleteInput";
import { useAuth } from "../../../context/AuthContext";
import { getUserMatchByWrestler } from "../../../controllers/manage/getmatches";
import {
  userUpdateMatch,
  userCreateMatch,
} from "../../../controllers/manage/create.js";
import { getTeamByUser } from "../../../controllers/manage/getbyuser.js";
import RefreshIcon from "@material-ui/icons/Refresh";

const Matches = () => {
  const { currentUser } = useAuth();
  const handleSubmit = () => {};
  const [mode, setMode] = useState("list");
  const [matchInfo, setMatchInfo] = useState({});
  const [wrestler, setWrestler] = useState({});
  const [tournament, setTournament] = useState("");
  const [newTournament, setNewTournament] = useState({
    year: "",
    name: "",
  });
  const [tab, setTab] = useState("wrestler");
  const onSelectorChange = () => {};
  useEffect(() => {
    getUserMatchByWrestler();
  }, []);
  const tempList = [
    {
      fullName: "temp name",
      team: "team",
    },
    {
      fullName: "temp name",
      team: "team",
    },
    {
      fullName: "temp name",
      team: "team",
    },
    {
      fullName: "temp name",
      team: "team",
    },
    {
      fullName: "temp name",
      team: "team",
    },
    {
      fullName: "temp name",
      team: "team",
    },
    {
      fullName: "temp name",
      team: "team",
    },
    {
      fullName: "temp name",
      team: "team",
    },
    {
      fullName: "temp name",
      team: "team",
    },
    {
      fullName: "temp name",
      team: "team",
    },
    {
      fullName: "temp name",
      team: "team",
    },
  ];
  return (
    <div>
      <Grid aria-labelledby='form-dialog-title'>
        <h3 id='form-dialog-title'> Matches </h3>

        <Grid container direction='row'>
          <Grid xs={6} sm={5} className='p-4'>
            <Card>
              <input />
              <ul
                style={{
                  listStyle: "none",
                  maxHeight: "40%",
                  overflow: "scroll",
                }}
              >
                {tempList.map(wrestler => (
                  <li>
                    {wrestler.fullName} <EditIcon />
                    <DeleteIcon />
                  </li>
                ))}
              </ul>{" "}
            </Card>
          </Grid>

          <Grid xs={6} sm={7}>
            <Card>
              <Button onClick={() => setTab("tournament")}>Tournament</Button>
              <Button onClick={() => setTab("wrestlers")}>Wrestlers</Button>
              {tab === "tournament" ? (
                <Grid className='p-4' direction='column' container>
                  <h6>Match Info:</h6>
                  <AutoComplete
                    state={matchInfo}
                    fn={setMatchInfo}
                    dialog={{
                      title: "Create Tournament",
                      contentText: "Add a tournament",
                    }}
                    label={"Tournament Name"}
                    database='tournament'
                  />
                  <Select
                    //
                    state={tournament}
                    name={"year"}
                    onChange={onSelectorChange}
                    //
                    options={["2016", "2017", "2018", "2019", "2020", "2021"]}
                    label={"Year"}
                  />
                  <Select
                    state={matchInfo}
                    fn={setMatchInfo}
                    name={"round"}
                    onChange={onSelectorChange}
                    options={[
                      "Qualification",
                      "1/16",
                      "1/8",
                      "Quarter-Final",
                      "Semi-Final",
                      "Final",
                    ]}
                    label={"Round"}
                  />
                  <Select
                    state={matchInfo}
                    fn={setMatchInfo}
                    name={"weightClass"}
                    onChange={onSelectorChange}
                    options={[
                      "57",
                      "61",
                      "65",
                      "70",
                      "74",
                      "79",
                      "86",
                      "92",
                      "97",
                      "125",
                    ]}
                    label={"Weight Class"}
                  />
                </Grid>
              ) : (
                <Grid className='pb-4' xs={12} justify='center' container>
                  {/* <input placeholder='Year'></input> */}
                  <Grid className='p-4' direction='column' container>
                    <h6>Wrestlers:</h6>

                    <AutoComplete
                      fn={setWrestler}
                      label={"Red Wrestler"}
                      state={wrestler}
                      name={"red"}
                      dialog={{
                        title: "Add a Wrestler",
                        contentText:
                          "If there is a missing Wrestler, please add them!",
                      }}
                      database='wrestler'
                    />
                    <br />
                    <AutoComplete
                      label={"Blue Wrestler"}
                      fn={setWrestler}
                      state={wrestler}
                      name={"blue"}
                      dialog={{
                        title: "Add a Wrestler",
                        contentText:
                          "If there is a missing Wrestler, please add them!",
                      }}
                      database='wrestler'
                    />
                  </Grid>
                  <Grid direction='row' container justify='center'>
                    <Grid container direction='column' className='w-50'>
                      <TextField
                        margin='dense'
                        id='name'
                        value={newTournament.year}
                        onChange={e =>
                          setMatchInfo({
                            ...matchInfo,
                            url: e.target.value,
                          })
                        }
                        label='Video Url'
                        type='text'
                      >
                        Video Url:
                      </TextField>
                      <FormHelperText>Video Url</FormHelperText>
                    </Grid>
                    <Button
                      onClick={() => {
                        //   console.log(wrestler);
                        //   console.log(matchInfo);
                      }}
                      style={{ marginTop: "20px" }}
                    >
                      Set Match Info
                    </Button>
                  </Grid>{" "}
                </Grid>
              )}
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Matches;
{
  /* 

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
      </Grid>
      <Grid>
        <Button onClick={handleClose} color='primary'>
          Cancel
        </Button>
        <Button
          onClick={() => {
            if (dialog.title === "Create Tournament") {
              const tournament = tournamentFormatter(newTournament);
              createTournament(tournament);
            }
          }}
          type='submit'
          color='primary'
        >
          Add
        </Button>
        </Grid>
    </form>
  )} */
}
