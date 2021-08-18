import React, { useState, useEffect } from "react";
import { Button, Card, Grid } from "@material-ui/core";
import Selector from "../Selector";
import { getTeams } from "../../controllers/controller";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { Link } from "react-router-dom";
const MakeSelections = () => {
  const [selections, setSelections] = useState({
    kg57: "",
    kg61: "",
    kg65: "",
    kg70: "",
    kg74: "",
    kg79: "",
    kg86: "",
    kg92: "",
    kg97: "",
    kg125: "",
  });
  const [teamOptions, setTeamOptions] = useState([]);
  const onSelectorChange = e => {
    setSelections({
      ...selections,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    const fetchTeam = async () => {
      const fetchedData = await getTeams();
      console.log(fetchedData.data);
      const newArray = fetchedData.data.map(team => {
        return { title: team.teamName, id: team._id };
      });
      setTeamOptions(newArray);
      console.log("newArray");
    };
    fetchTeam();
  }, []);
  return (
    <Grid container direction='row' className='p-4' justify='space-evenly'>
      <Grid contain direction='row' xs={12}>
        <Button>
          <Link to='/fantasy'>
            {" "}
            <ArrowBackIcon />
          </Link>
        </Button>

        <Button>Freestyle</Button>
        <Button>Greco</Button>
        <Button>Women's Freestyle</Button>
      </Grid>
      <Grid container xs={4} direction='column' className='px-2'>
        <Card className='px-2'>
          <h6>Selections</h6>

          <ul style={{ listStyleType: "none" }}>
            <li>57kg: {selections.kg57}</li>
            <li>61kg: {selections.kg61}</li>
            <li>65kg: {selections.kg65}</li>
            <li>70kg: {selections.kg70}</li>
            <li>74kg: {selections.kg74}</li>
            <li>79kg: {selections.kg79}</li>
            <li>86kg: {selections.kg86}</li>
            <li>92kg: {selections.kg92}</li>
            <li>97kg: {selections.kg97}</li>
            <li>125kg: {selections.kg125}</li>
          </ul>
        </Card>
      </Grid>
      <Grid container xs={8}>
        <Selector
          options={teamOptions}
          name='kg57'
          label='57kg'
          onChange={onSelectorChange}
          state={selections}
        />
        <Selector
          options={teamOptions}
          name='kg61'
          label='61kg'
          onChange={onSelectorChange}
          state={selections}
        />
        <Selector
          options={teamOptions}
          name='kg65'
          label='65kg'
          onChange={onSelectorChange}
          state={selections}
        />
        <Selector
          options={teamOptions}
          name='kg70'
          label='70kg'
          onChange={onSelectorChange}
          state={selections}
        />
        <Selector
          options={teamOptions}
          name='kg74'
          label='74kg'
          onChange={onSelectorChange}
          state={selections}
        />
        <Selector
          options={teamOptions}
          name='kg79'
          label='79kg'
          onChange={onSelectorChange}
          state={selections}
        />
        <Selector
          options={teamOptions}
          name='kg86'
          label='86kg'
          onChange={onSelectorChange}
          state={selections}
        />
        <Selector
          options={teamOptions}
          name='kg92'
          label='92kg'
          onChange={onSelectorChange}
          state={selections}
        />
        <Selector
          options={teamOptions}
          name='kg97'
          label='97kg'
          onChange={onSelectorChange}
          state={selections}
        />
        <Selector
          options={teamOptions}
          name='kg125'
          label='125kg'
          onChange={onSelectorChange}
          state={selections}
        />
      </Grid>
      <Grid contain direction='row' xs={12} justify='flex-end'>
        <Button>Save</Button>
      </Grid>
    </Grid>
  );
};

export default MakeSelections;

const scores = [25, 20, 15, 15, 10, 10, 8, 6, 4, 2];

const scoringSelection = (selection, results) => {
  const points = Object.values(selection).map(sel => {
    const index = results.indexOf(sel) || 0;
    return scores[index];
  });
  let totalScore = points.reduce((a, b) => b + a, 0);
};
