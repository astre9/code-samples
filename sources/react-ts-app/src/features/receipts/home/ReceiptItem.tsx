import React from "react";
import { IReceipt } from "../../../app/models/receipt";
import {
  Grid,
  Card,
  CardActionArea,
  CardMedia,
  Button,
  makeStyles,
  CardActions,
  Chip,
  Theme,
  createStyles,
} from "@material-ui/core";
import { NavLink } from "react-router-dom";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: 350,
    },
    media: {
      height: 450,
    },
    actions: {
      display: "flex",
      justifyContent: "space-between",
    },
    chipVerified: {
      backgroundColor: theme.palette.success.dark,
      iconColorPrimary: {
        color: "#FFFFFF",
      },
    },
    chipNotVerified: {
      backgroundColor: theme.palette.error.main,
      iconColorPrimary: {
        color: "#FFFFFF",
      },
    },
  })
);

const ReceiptItem: React.FC<{ receipt: IReceipt }> = ({ receipt }) => {
  const classes = useStyles();

  return (
    <Grid key={receipt.filename} item>
      <Card className={classes.root}>
        <CardActions className={classes.actions}>
          <Button
            color="primary"
            component={NavLink}
            to={`/receipts/${receipt.filename}`}
          >
            View
          </Button>
          {receipt.isVerified ? (
            <Chip
              color="primary"
              label="Verified"
              icon={<VerifiedUserIcon />}
              className={classes.chipVerified}
            />
          ) : (
            <Chip
              color="primary"
              label="Not verified"
              icon={<VerifiedUserIcon />}
              className={classes.chipNotVerified}
            />
          )}
        </CardActions>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={receipt.url}
            component={NavLink}
            to={`/receipts/${receipt.filename}`}
            title={receipt.filename}
          />
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default ReceiptItem;
