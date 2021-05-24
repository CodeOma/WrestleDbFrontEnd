import React, { useState, useRef, useEffect } from "react";
import {
  Grid,
  Button,
  Card,
  TextField,
  FormHelperText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Select from "./Selector";
import { getTournaments } from "../../controllers/controller";
import AutoComplete from "./AutoCompleteInput";
import SettingsIcon from "@material-ui/icons/Settings";
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
  const player = useRef(null);

  const onSelectorChange = (e, state, fn) => {
    fn({ ...state, [e.target.name]: e.target.value });
  };
  return (
    <Grid className='pb-4' xs={12} justify='center' container>
      {/* <input placeholder='Year'></input> */}
      <Grid className='p-4' direction='column' xs={6} container>
        <h6>Wrestlers:</h6>

        <AutoComplete
          fn={setWrestler}
          label={"Red Wrestler"}
          state={wrestler}
          name={"red"}
          dialog={{
            title: "Add a Wrestler",
            contentText: "If there is a missing Wrestler, please add them!",
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
            contentText: "If there is a missing Wrestler, please add them!",
          }}
          database='wrestler'
        />
      </Grid>

      <Grid direction='row' container justify='center'>
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
  );
};

export default CreateModal;
