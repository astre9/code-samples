import React from "react";
import { LinearProgress, Typography, makeStyles, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "100px",
  },
}));

const LoadingComponent: React.FC<{ inverted?: boolean; content?: string }> = ({
  inverted = true,
  content,
}) => {
  const classes = useStyles();
  return (
    <Grid item md={10} className={classes.root}>
      <Typography variant="h4" gutterBottom >
        {content}
      </Typography>
      <LinearProgress />
    </Grid>
  );
};

export default LoadingComponent;
