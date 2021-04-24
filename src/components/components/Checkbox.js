import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Grid, Button } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

const styles = {
  root: {
    width: "100%",
  },
  heading: {
    overflow: "wrap",
    // width:'2vw' ,
    fontWeight: "regular",
  },
};

const Checkbox = ({
  data,
  handleFilters,
  name,
  label,
  setSelectedFilters,
  selectedFilters,
  wrestName,
}) => {
  const [checked, setChecked] = useState([]);
  const [options, setOptions] = useState(data);
  const [filteredOptions, setFilteredOptions] = useState([]);
  useEffect(() => {
    setOptions(data);
  }, [data]);
  useEffect(() => {
    setChecked([]);
    setSelectedFilters({
      weightClass: [],
      teams: [],
      opponent: [],
      winLoss: [],
      round: [],
      tournament: [],
      result: [],
    });
  }, [wrestName]);

  const handleToggle = c => () => {
    const currentCategoryId = checked.indexOf(c);
    const newCheckedCategoryId = [...checked];
    // if currently checked was not already in checked state > push
    // else pull/take off
    if (currentCategoryId === -1) {
      newCheckedCategoryId.push(c);
    } else {
      newCheckedCategoryId.splice(currentCategoryId, 1);
    }
    // console.log(newCheckedCategoryId);
    setChecked(newCheckedCategoryId);
    setSelectedFilters({ ...selectedFilters, [name]: newCheckedCategoryId });
    // handleFilters(newCheckedCategoryId);
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
            <Grid>
              <p style={styles.heading}> {label || "Option"}</p>

              {checked.map(c => (
                <li className='list-unstyled pl-3'>{c}</li>
              ))}
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Grid
              className='pl-4'
              container
              direction='row'
              style={{ maxHeight: "200px", overflow: "scroll" }}
            >
              {/* <input
                onChange={e => {
                  console.log(e.target.value);

                  const filtered = options.filter(opt => {
                    return opt.match(/`${e.target.value}`/i);
                  });
                  setFilteredOptions(filtered);
                  console.log(filteredOptions);
                }}
              ></input> */}
              {options &&
                options
                  .filter(c => (c ? true : false))
                  .sort((a, b) => a - b)
                  .map((c, i) => (
                    <li
                      key={i}
                      className='list-unstyled'
                      style={{ width: "100%" }}
                    >
                      <p>
                        {/* <Grid container direction='row'> */}
                        {/* <Button></Button> */}
                        {checked.includes(c) ? (
                          <CheckBoxIcon
                            fontSize='inherit'
                            onClick={handleToggle(c)}
                          />
                        ) : (
                          <CheckBoxOutlineBlankIcon
                            fontSize='inherit'
                            onClick={handleToggle(c)}
                          />
                        )}
                        {c}
                      </p>
                      {/* </Grid> */}
                      {/* <input onChange={handleToggle(c)} type='checkbox' />
                    <label className='pl-2'> {c}</label> */}
                    </li>
                  ))}
            </Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    </Grid>
  );
};

export default Checkbox;

export const CheckboxDef = ({ options, name }) => {
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
            <Grid className='pl-4' container direction='column'></Grid>
          </AccordionDetails>
        </Accordion>
      </div>
    </Grid>
  );
};
