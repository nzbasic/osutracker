import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function ProtectedRoute(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const Component = props.component;

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios.post("/login", { token: token }).then((res) => {
      if (res.data.auth == "success") {
        setIsLoggedIn(true);
        setIsLoading(false);
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
    });
  });

  return isLoggedIn ? (
    <Component />
  ) : isLoading ? (
    "Loading..."
  ) : (
    <Redirect to={{ pathname: "/" }} />
  );
}
