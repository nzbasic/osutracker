import React, { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import { ToastContainer, toast } from "react-toastify";
import CircularProgress from "@material-ui/core/CircularProgress";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
export default function AddUser() {
  const [players, setPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setLoading] = useState(true);

  const editSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    document.title = "Add Player";
    axios.get("/api/users/id").then((res) => {
      setPlayers(res.data.map((user) => user.name.toLowerCase()));
      setLoading(false);
    });
  }, []);

  const toastSetting = {
    position: "bottom-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "",
  };

  const addUser = async () => {
    if (players.includes(searchTerm.toLowerCase())) {
      toast.error("User already tracked!", toastSetting);
    } else {
      setLoading(true);

      let flag = true;
      let message = "";

      await axios.post("/api/users/add", { name: searchTerm }).then((res) => {
        if (res.data === "Added") {
          message = searchTerm + " added!";
          players.push(searchTerm);
        } else {
          message = res.data;
        }
      });

      if (flag) {
        toast.success(message, toastSetting);
      } else {
        toast.error(message, toastSetting);
      }

      setLoading(false);
      setSearchTerm("");
    }
  };

  return isLoading ? (
    <div className="w-screen h-screen flex justify-center align-center">
      <CircularProgress className="self-center" size="10rem" />
    </div>
  ) : (
    <div className="flex flex-col justify-center items-center mt-12 lg:mt-0">
      <ToastContainer />
      <div className="bg-main-one font-bold text-2xl rounded-md shadow-md p-4 mt-4 mb-6">
        Add a new player.
      </div>
      <div className="flex">
        <TextField
          variant="outlined"
          label="Player name"
          onChange={editSearchTerm}
          value={searchTerm}
        />
        <div
          onClick={addUser}
          className="bg-main-one hover:bg-main-four  shadow-md cursor-pointer border-gray-900 border-2 self-center rounded-md p-2 ml-2"
        >
          Submit
        </div>
      </div>
    </div>
  );
}
