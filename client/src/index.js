import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./style.css";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#3282b8",
    },
    secondary: {
      main: "#c91a34",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById("root")
);
