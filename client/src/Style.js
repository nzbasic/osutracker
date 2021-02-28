import { makeStyles, withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

export const useStyles = makeStyles({
  primary: {
    background: "#3282b8",
    "&:hover": {
      backgroundColor: "#00adb5",
    },
  },
  secondary: {
    background: "#c91a34",
    "&:hover": {
      backgroundColor: "#e32424",
    },
  },
});

export const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "red",
      },
      "&:hover fieldset": {
        borderColor: "yellow",
      },
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);

export default function test() {
  return <div>Something went very wrong</div>;
}
