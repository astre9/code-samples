import React, { useContext, useEffect } from "react";
import { RootStoreContext } from "../../../app/stores/rootStore";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import { observer } from "mobx-react-lite";
import ReceiptList from "./ReceiptList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: "100px",
    justify: "flex-start",
  },
}));

const ReceiptHome = () => {
  const rootStore = useContext(RootStoreContext);

  const classes = useStyles();
  const { loadReceipts, loadingInitial } = rootStore.receiptStore;

  useEffect(() => {
    loadReceipts();
  }, [loadReceipts]);

  if (loadingInitial) return <LoadingComponent content="Loading receipts" />;

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <ReceiptList />
      </Grid>
    </Grid>
  );
};

export default observer(ReceiptHome);
