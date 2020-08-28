import React, { Fragment } from "react";
import { observer } from "mobx-react-lite";
import { Route, RouteComponentProps, withRouter } from "react-router-dom";
import ReceiptHome from "../../features/receipts/home/ReceiptHome";
import Sidebar from "../../features/menu/SideBar";
import { Grid, ThemeProvider } from "@material-ui/core";
import ReceiptDetails from "../../features/receipts/details/ReceiptDetails";
import { theme } from "./theme";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Grid container spacing={1}>
          <Grid item md={2}>
            <Sidebar />
          </Grid>
          <Grid item md={10}>
            <Route exact path="/receipts" component={ReceiptHome} />
            <Route exact path="/" component={ReceiptHome} />
            <Route
              exact
              path="/receipts/:filename"
              component={ReceiptDetails}
            />
          </Grid>
        </Grid>
      </ThemeProvider>
    </Fragment>
  );
};

export default withRouter(observer(App));
