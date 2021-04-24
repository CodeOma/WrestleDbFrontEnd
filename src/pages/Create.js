import React, { useState } from "react";
import { Grid, Button } from "@material-ui/core";

const Create = () => {
  const [wrestler, setWrestler] = useState({
    fullName: "",
    lastName: "",
    team: "",
  });
  const [tournament, setTournament] = useState({
    fullName: "",
    lastName: "",
    team: "",
  });
  const handleWrestler = e => {
    setWrestler({
      ...wrestler,
      [e.target.name]: e.target.value,
    });

    console.log(wrestler);
  };

  const handleSubmit = () => {
    const lastName = wrestler.lastName.toUpperCase();

    const name = wrestler.fullName.split(" ");
    const fullName = `${name[0]} ${name[1].toUpperCase()}`;
    console.log(fullName);
    setWrestler({
      lastName,
      team: wrestler.team.toUpperCase(),
      fullName,
    });
    console.log(wrestler);
  };

  const handleSave = () => {
    //   axios.post('/')
  };
  const handleTournament = () => {};
  return (
    <Grid>
      <input
        name='fullName'
        onChange={handleWrestler}
        value={wrestler.fullName}
        placeholder='Full Name'
      ></input>
      <input
        onChange={handleWrestler}
        name='lastName'
        value={wrestler.lastName}
        placeholder='Last Name'
      ></input>
      <input
        onChange={handleWrestler}
        name='team'
        value={wrestler.team}
        placeholder='Team'
      ></input>

      <Button onClick={handleSubmit}>Submit Wrestler</Button>
      <Button onClick={handleSave}>Save</Button>
    </Grid>
  );
};

export default Create;
