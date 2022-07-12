import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const Redirect = () => {
  const params = useParams<"name">()
  const name = params.name??"YEP"

  useEffect(() => {
    axios.get("/api/users/" + name + "/getId").then(res => {
      window.location.replace("/user/" + res.data);
    });
  }, [name]);
  
  return <div className="main-container"></div>;
}