import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function DescriptionAlerts({ title, severity, message }) {
  const classes = useStyles();

  return (
    <Alert style={{ minWidth: "16rem" }} severity={severity}>
      <AlertTitle>{title}</AlertTitle>
      {message}{" "}
    </Alert>
  );
}

{
  /* <Alert severity='warning'>
<AlertTitle>Warning</AlertTitle>
This is a warning alert — <strong>check it out!</strong>
</Alert>
<Alert severity='info'>
<AlertTitle>Info</AlertTitle>
This is an info alert — <strong>check it out!</strong>
</Alert>
<Alert severity='success'>
<AlertTitle>Success</AlertTitle>
This is a success alert — <strong>check it out!</strong>
</Alert> */
}
