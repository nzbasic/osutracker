import React from "react";
import { GoogleLogin } from "react-google-login";
import axios from "axios";
import Button from "@material-ui/core/Button";

export default function Login() {
  const responseGoogle = (response) => {
    let id = response.tokenId;
    console.log(id);
    localStorage.setItem("token", id);
    axios.post("/login", { token: id }).then((res) => {
      if (res.data.auth == "success") {
        window.location.href = "/admin";
      } else {
        console.log("access denied");
      }
    });
  };

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <div>
      <GoogleLogin
        clientId="652614744493-0sd7cu5ldroucb4c041ub3i4sjiocmvl.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button
            variant="contained"
            color="secondary"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
          >
            Admin Login
          </Button>
        )}
        buttonText="Admin Login"
        onSuccess={responseGoogle}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
}
