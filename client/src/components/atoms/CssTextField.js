import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/styles";

const Css = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiInputBase-root": {
      color: "white",
    },
    "& .MuiFormHelperText": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "lightblue",
      },
      "&.Mui-focused fieldset": {
        borderColor: "lightblue",
      },
    },
  },
})(TextField);

export default function CssTextField(props) {
  return (
    <Css
      id="textfield"
      label={props.label}
      error={props.error}
      helperText={props.errorText}
      onKeyDown={props.onKeyDown}
      variant="outlined"
      InputLabelProps={{
        style: { color: "white" },
      }}
      onChange={props.onChange}
      value={props.searchTerm}
    />
  );
}
