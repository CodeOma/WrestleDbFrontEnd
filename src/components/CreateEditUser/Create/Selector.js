import React, { useState, useEffect } from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

const Selector = ({ options, name, label, onChange, state, fn, disabled }) => {
  const styles = {
    formControl: {
      minWidth: 150,
      // width:"12rem"
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
    <FormControl className='px-2' style={styles.formControl}>
      <NativeSelect
        value={opt}
        disabled={disabled ? true : false}
        onChange={e => {
          // setOpt(e.target.value);

          onChange(e, state, fn);
          setOpt(state[name]);
          console.log(opt);
        }}
        name={name}
        className={styles.selectEmpty}
        inputProps={{ "aria-label": "age" }}
      >
        <option value=''> </option>
        {options.map(opt => {
          return <option value={opt}>{opt}</option>;
        })}
      </NativeSelect>
      <FormHelperText>{label}</FormHelperText>
    </FormControl>
  );
};

export default Selector;

// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// import FormHelperText from "@material-ui/core/FormHelperText";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";
// import NativeSelect from "@material-ui/core/NativeSelect";

// const Selector = ({ options, label }) => {
//   const styles = {
//     formControl: {
//       minWidth: 120,
//     },
//     selectEmpty: {
//       marginTop: "1",
//     },
//   };
//   const [opt, setOpt] = useState("");
//   const handleChange = e => {
//     setOpt(e.target.value);
//   };
//   return (
//     <FormControl style={styles.formControl}>
//       <NativeSelect
//         value={opt}
//         onChange={handleChange}
//         name='age'
//         className={styles.selectEmpty}
//         inputProps={{ "aria-label": "age" }}
//       >
//         <option value=''> </option>
//         {options.map(opt => {
//           return <option value={opt}>{opt}</option>;
//         })}
//       </NativeSelect>
//       <FormHelperText>{label}</FormHelperText>
//     </FormControl>
//   );
// };

// export default Selector;
