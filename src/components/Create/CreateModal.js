import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Button,
  Card,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Select from "./Selector";

import AutoComplete from "./AutoCompleteInput";
import SettingsIcon from "@material-ui/icons/Settings";
import Alert from "../components/Alert";
const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const CreateModal = ({
  link,
  setWrestler,
  wrestler,
  setMatchInfo,
  matchInfo,
  isOpenDef,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(isOpenDef);
  const [tournament, setTournament] = useState(true);
  const [tournamentOptions, setTournamentOptions] = useState([]);
  const [url, setUrl] = useState("");
  const [mode, setMode] = useState("match");
  // const player = useRef(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // useEffect(() => {
  //   const getInfo = async () => {
  //     const tournament = await getTournaments();

  //     console.log(tournament);
  //     console.log("YOLO");
  //   };
  //   getInfo();
  //   setUrl(link);
  // }, [link]);
  useEffect(() => {
    const timer = setTimeout(() => setError(""), 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);
  const onSelectorChange = (e, state, fn) => {
    fn({ ...state, [e.target.name]: e.target.value });
  };
  const onResultSelectorChange = (e, state, fn) => {
    if (e.target.name === "winner" || e.target.name === "loser") {
      const name =
        wrestler.red === e.target.value ? wrestler.red : wrestler.blue;
      fn({
        ...state,
        result: { ...state.result, [e.target.name]: name },
      });
    } else if (e.target.name === "victoryType") {
      //  const victoryType = e.target.value
      console.log(e.target.value);
      console.log(e.target.name);
      const winnerPoints =
        e.target.value === "VPO"
          ? 3
          : e.target.value === "VPO1"
          ? 3
          : e.target.value === "VSU"
          ? 4
          : e.target.value === "VSU1"
          ? 4
          : e.target.value === "VFA"
          ? 5
          : e.target.value === "VCA"
          ? 5
          : e.target.value === "VIN"
          ? 5
          : e.target.value === "DSQ"
          ? 5
          : 0;
      const loserPoints =
        e.target.value === "VPO"
          ? 0
          : e.target.value === "VPO1"
          ? 1
          : e.target.value === "VSU"
          ? 0
          : e.target.value === "VSU1"
          ? 1
          : e.target.value === "VFA"
          ? 0
          : e.target.value === "VCA"
          ? 0
          : e.target.value === "VIN"
          ? 0
          : e.target.value === "DSQ"
          ? 0
          : 0;
      fn({
        ...state,
        result: {
          ...state.result,
          winnerPoints,
          loserPoints,
          victoryType: e.target.value,
        },
      });
    }
  };
  return (
    <div>
      <Button type='button' onClick={handleOpen}>
        <SettingsIcon />{" "}
      </Button>

      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Card style={{ width: 800, padding: "10px" }}>
            <div className='d-flex justify-content-end w-100'>
              {" "}
              <Button onClick={() => setOpen(false)}>
                {" "}
                <CloseIcon />{" "}
              </Button>
            </div>

            {error && (
              <Alert title='error' severity='warning' message={error} />
            )}
            <Grid className='pb-4' xs={12} justify='center' container>
              <Grid className='p-4' direction='column' xs={6} container>
                <h6>Match Info:</h6>
                <AutoComplete
                  state={matchInfo}
                  fn={setMatchInfo}
                  dialog={{
                    title: "Create Tournament",
                    contentText: "Add a tournament",
                  }}
                  value={matchInfo.tournament}
                  label={"Tournament Name"}
                  database='tournament'
                  name='tournament'
                />

                <Select
                  //
                  state={matchInfo}
                  fn={setMatchInfo}
                  value={matchInfo.round}
                  name={"round"}
                  onChange={onSelectorChange}
                  //
                  options={[
                    "Qualif.",
                    "1/16",
                    "1/8 Final",
                    "1/4 Final",
                    "1/2 Final",
                    "Final 1-2",
                    "Final 3-5",

                    "Repechage",
                  ]}
                  label={"Round"}
                />
                <Select
                  //
                  state={matchInfo}
                  fn={setMatchInfo}
                  value={matchInfo.weightClass}
                  name={"weightClass"}
                  onChange={onSelectorChange}
                  //
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

              {/* <input placeholder='Year'></input> */}
              <Grid className='p-4' direction='column' xs={6} container>
                <h6>Wrestlers:</h6>

                <AutoComplete
                  fn={setWrestler}
                  label={"Red Wrestler"}
                  state={wrestler}
                  name={"red"}
                  value={matchInfo.redWrestler}
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
                  value={matchInfo.blueWrestler}
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
              <Grid direction='row' xs={12} justify='center' container>
                <h6>Results:</h6>

                <Select
                  //
                  state={matchInfo}
                  fn={setMatchInfo}
                  name={"winner"}
                  onChange={onResultSelectorChange}
                  value={
                    matchInfo.result.winner === wrestler.red
                      ? wrestler.red
                      : matchInfo.result.winner === wrestler.blue
                      ? wrestler.blue
                      : ""
                  }
                  options={[wrestler.red, wrestler.blue]}
                  label={"Winner"}
                />

                <Select
                  //
                  state={matchInfo}
                  fn={setMatchInfo}
                  name={"loser"}
                  value={
                    matchInfo.result.loser === wrestler.red
                      ? wrestler.red
                      : matchInfo.result.loser === wrestler.blue
                      ? wrestler.blue
                      : ""
                  }
                  onChange={onResultSelectorChange}
                  //
                  options={[wrestler.red, wrestler.blue]}
                  label={"Loser"}
                />
                <Select
                  //
                  state={matchInfo}
                  fn={setMatchInfo}
                  name={"victoryType"}
                  value={matchInfo.result.victoryType}
                  onChange={onResultSelectorChange}
                  //
                  options={[
                    "VPO",
                    "VPO1",
                    "VSU",
                    "VSU1",
                    "VFA",
                    "VIN",
                    "VCA",
                    "DSQ",
                    "2DSQ",
                  ]}
                  label={"Victory Type"}
                />
              </Grid>
              <Grid direction='row' container justify='center'>
                <Grid container direction='column' className='w-50'>
                  <TextField
                    margin='dense'
                    // id='name'
                    onChange={e =>
                      setMatchInfo({
                        ...matchInfo,
                        url: e.target.value,
                      })
                    }
                    value={matchInfo.url}
                    // label='Video Url'
                    type='text'
                  >
                    Video Url:
                  </TextField>
                  <FormHelperText>Video Url</FormHelperText>
                </Grid>
                <Button
                  onClick={() => {
                    console.log(wrestler);
                    console.log(matchInfo);
                  }}
                  style={{ marginTop: "20px" }}
                >
                  Set Match Info
                </Button>
              </Grid>
            </Grid>
          </Card>
        </Fade>
      </Modal>
    </div>
  );
};

export default CreateModal;
