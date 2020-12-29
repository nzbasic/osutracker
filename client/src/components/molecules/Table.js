import React, { useEffect } from "react";
import axios from "axios";
import MaterialTable from "material-table";
import { forwardRef } from "react";
import Header from "./Header";

import AddBox from "@material-ui/icons/AddBox";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import CheckCircle from "@material-ui/icons/CheckCircle";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
  CheckCircle: forwardRef((props, ref) => <CheckCircle {...props} ref={ref} />),
};

function createData(name) {
  return { name };
}

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

export default function EnhancedTable() {
  const [rows, setRows] = React.useState([]);

  useEffect(() => {
    axios.get("/newplayer").then((response) => {
      setRows(response.data.map((user) => createData(user.name)));
    });
  }, []);

  function handleAdd(evt, data) {
    let newRows = rows;
    data.forEach((element) => {
      newRows = arrayRemove(newRows, element);

      axios.post("/newplayer/change", {
        token: localStorage.getItem("token"),
        player: element.name,
      });
    });
    setRows(newRows);
  }

  function handleDelete(evt, data) {
    let newRows = rows;
    data.forEach((element) => {
      newRows = arrayRemove(newRows, element);

      axios.post("/newplayer/remove", {
        token: localStorage.getItem("token"),
        player: element.name,
      });
    });
    setRows(newRows);
  }

  return (
    <div className="bg-gray-200 h-screen">
      <div className="m-10">
        <MaterialTable
          title="New Users"
          icons={tableIcons}
          columns={[{ title: "Name", field: "name" }]}
          data={rows}
          options={{
            selection: true,
          }}
          actions={[
            {
              tooltip: "Remove All Selected Users",
              icon: tableIcons.Delete,
              onClick: handleDelete,
            },
            {
              tooltip: "Approve All Selected Users",
              icon: tableIcons.CheckCircle,
              onClick: handleAdd,
            },
          ]}
        />
      </div>
    </div>
  );
}
