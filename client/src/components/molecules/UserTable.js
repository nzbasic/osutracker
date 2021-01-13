import React from 'react'
import MaterialTable from 'material-table'
import { forwardRef } from "react"

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

export default function UserTable() {
    return (
        <MaterialTable
          title="All Users + Weekly Change"
          icons={tableIcons}
          columns={[
            {   title: 'Name', 
                field: 'name', 
                render: rowData => <a style={{color: '#3282b8'}} href={"http://osutracker.com/user/" + rowData.name}>{rowData.name}</a> 
            },
            {   title: 'Rank', 
                field: 'rank', 
                render: rowData => <h1>{rowData.rank + " (" + rowData.rankChange + ")"}</h1>
            },
            {   title: 'Pp', 
                field: 'pp', 
                render: rowData => <h1>{rowData.pp + " (" + rowData.ppChange + ")"}</h1>
            },
            {   title: 'Acc', 
                field: 'acc', 
                render: rowData => <h1>{rowData.acc + " (" + rowData.accChange + ")"}</h1>
            },
            {   title: 'Play Count', 
                field: 'plays', 
                render: rowData => <h1>{rowData.plays + " (" + rowData.playsChange + ")"}</h1> 
            },
          ]}
          data={[
            { name: 'YEP', pp: 6701, rank: 14000, acc: 98.71, plays: 71000, ppChange: '+5', rankChange: '-100', accChange: '-0.5%', playsChange: '+200' },
          ]}        
        />
      )
}
