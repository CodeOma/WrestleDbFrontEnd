import React, { useState, useEffect } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

const Selector = ({ options, name, label, onChange, state }) => {
  const styles = {
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: "1",
    },
  };
  const [opt, setOpt] = useState("");
  useEffect(() => {
    setOpt(state[name]);
  }, [state]);
  return (
    <FormControl style={styles.formControl}>
      <NativeSelect
        value={opt}
        onChange={e => {
          // setOpt(e.target.value);
          if (e.target.value !== "") {
            console.log(e.target.value, state, name);
            onChange(e);
            setOpt(state[name]);
          }
        }}
        name={name}
        className={styles.selectEmpty}
        inputProps={{ "aria-label": "age" }}
      >
        <option value=''> </option>
        {options.map(opt => {
          return <option value={opt.title}>{opt.title}</option>;
        })}
      </NativeSelect>
      <FormHelperText>{label}</FormHelperText>
    </FormControl>
  );
};

export default Selector;
