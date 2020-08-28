import { ContextFormValues } from "../../../app/models/receipt";
import {
  Grid,
  Card,
  CardMedia,
  makeStyles,
  CardContent,
} from "@material-ui/core";
import { RouteComponentProps } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "../../../app/stores/rootStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import ReceiptContextsForm from "./ReceiptContextsForm";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginTop: "50px",
  },
  media: {
    height: 775,
    width: 500,
  },
}));

interface DetailParams {
  filename: string;
}

const ReceiptDetails: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const classes = useStyles();
  const rootStore = useContext(RootStoreContext);

  const { loadContexts, loadingContexts } = rootStore.receiptStore;

  const [formContexts, setFormContexts] = useState(new ContextFormValues());

  const filename = match.params.filename;

  useEffect(() => {
    loadContexts(filename).then((contexts) => {
      setFormContexts(new ContextFormValues(contexts));
    });
  }, [loadContexts, filename]);

  if (loadingContexts) return <LoadingComponent content="Loading contexts" />;

  return (
    <Grid container className={classes.root}>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={`/bonuri-jpg/${filename}`}
          title={filename}
        />
        <CardContent>
          <ReceiptContextsForm filename={filename} formContexts={formContexts} />
        </CardContent>
      </Card>
    </Grid>
  );
};

export default observer(ReceiptDetails);
