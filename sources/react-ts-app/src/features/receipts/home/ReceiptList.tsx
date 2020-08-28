import React, { useContext, Fragment } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ReceiptItem from "./ReceiptItem";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const ReceiptList = () => {
  const rootStore = useContext(RootStoreContext);
  const { receiptsSorted } = rootStore.receiptStore;

  const classes = useStyles();

  return (
    <Fragment>
      <Grid container className={classes.root} spacing={2}>
        <Grid item md={12}>
          <Grid container justify="center" spacing={2}>
            {receiptsSorted.map((receipt, index) => {
              return <ReceiptItem receipt={receipt} key={`receipt${index}`} />;
            })}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default observer(ReceiptList);
