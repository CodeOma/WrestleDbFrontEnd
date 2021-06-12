import React, { useState } from "react";
import {
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Typography,
  Button,
  Card,
  Grid,
  Input,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import WrestlerMode from "./Modes/Wrestlers";
import MatchesMode from "./Modes/Matches";
import TagsMode from "./Modes/Tags";
import TakedownsMode from "./Modes/Takedowns";
import TournamentMode from "./Modes/Tournament";
import TeamMode from "./Modes/Teams";
import PositionMode from "./Modes/Position";
import CategoryMode from "./Modes/Category";
import TypeMode from "./Modes/Type";

const Manage = () => {
  const [manageState, setManageState] = useState("takedowns");

  //   const [modes, setModes] = useState({

  //   })
  return (
    <Grid container direction='row' className='m-4'>
      <h3>Manage</h3>

      <Grid container direction='row' xs={12}>
        <Grid
          xs={10}
          md={2}
          className='pt-4'
          style={{ backgroundColor: "white" }}
        >
          <CheckboxDef name='Wrestlers' setManageState={setManageState} />
          <CheckboxDef name='Takedowns' setManageState={setManageState} />
          <CheckboxDef name='Matches' setManageState={setManageState} />
        </Grid>
        <Grid
          xs={10}
          // md={9}
          justify='center'
          style={{ backgroundColor: "white" }}
        >
          {manageState === "wrestler" && <WrestlerMode />}
          {manageState === "matches" && <MatchesMode />}
          {manageState === "tags" && <TagsMode />}
          {manageState === "takedowns" && <TakedownsMode />}
          {manageState === "tournament" && <TournamentMode />}
          {manageState === "team" && <TeamMode />}
          {manageState === "type" && <TypeMode />}
          {manageState === "position" && <PositionMode />}
          {manageState === "category" && <CategoryMode />}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Manage;

const CheckboxDef = ({ options, name, setManageState }) => {
  const styles = {
    heading: {},
  };
  return (
    <Grid className='pt-2' style={{ width: "100%" }}>
      <div style={{ width: "100%" }}>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls='panel1a-content'
            id='panel1a-header'
          >
            <Typography className={styles.heading}>
              {name || "Option"}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid className='pl-4' container direction='column'>
              {name === "Takedowns" && (
                <Grid>
                  <Button
                    onClick={() => setManageState("takedowns")}
                    style={{ width: "100" }}
                  >
                    Takedowns
                  </Button>
                  <Button
                    onClick={() => setManageState("tags")}
                    style={{ width: "100" }}
                  >
                    Tags/Setups
                  </Button>

                  <Button
                    onClick={() => setManageState("type")}
                    style={{ width: "100" }}
                  >
                    Type
                  </Button>
                  <Button
                    onClick={() => setManageState("category")}
                    style={{ width: "100" }}
                  >
                    Category
                  </Button>
                  <Button
                    onClick={() => setManageState("position")}
                    style={{ width: "100" }}
                  >
                    Position
                  </Button>
                </Grid>
              )}
              {name === "Wrestlers" && (
                <Grid>
                  <Button
                    onClick={() => setManageState("wrestler")}
                    style={{ width: "100" }}
                  >
                    Wrestler
                  </Button>
                  <Button
                    onClick={() => setManageState("team")}
                    style={{ width: "100" }}
                  >
                    Team
                  </Button>
                </Grid>
              )}
              {name === "Matches" && (
                <Grid>
                  <Button
                    onClick={() => setManageState("matches")}
                    style={{ width: "100" }}
                  >
                    Matches
                  </Button>
                  <Button
                    onClick={() => setManageState("tournament")}
                    style={{ width: "100" }}
                  >
                    Tournament
                  </Button>
                </Grid>
              )}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    </Grid>
  );
};
