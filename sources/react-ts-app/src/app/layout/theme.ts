import { createMuiTheme } from "@material-ui/core/styles";
import purple from "@material-ui/core/colors/purple";
import green from "@material-ui/core/colors/green";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2C73D2",
    },
    secondary: {
      main: "#00D9B3",
    },
    success: {
      main: "#8BEE86",
      light: "#00D9B3",
    },
  },
});
