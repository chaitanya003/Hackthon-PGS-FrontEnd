import React from 'react';
import DataTable from 'react-data-table-component';
import { Typography, LinearProgress } from '@material-ui/core';
import Card from "@material-ui/core/Card";
import SortIcon from "@material-ui/icons/ArrowDownward";
import axios from 'axios';
import Navbar from './navbar';
const columns = [
  {
    name: 'Asset Id',
    selector: 'assetId',
    sortable: true,
  },
  {
    name: 'Serial Number',
    selector: 'serialNumber',
    sortable: true,
  },
  {
    name: 'Asset Name',
    selector: 'assetName',
    sortable: true,
    right: true,
  },
  {
    name: 'Status',
    selector: 'status',
    sortable: true,
    right: true,
    conditionalCellStyles: [
      {
        when: row => row.status === "Allotted",
        style: {
          color: '#008800',
        },
      },
      {
        when: row => row.status === "Unallotted",
        style: {
          color: '#F66',
        },
      },
    ],
  },
];


class AssetStore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      title: "",
      loading: true,
    }
  }

  componentDidMount() {
    let apiURl = '/asset/allocation/store?store=' + this.props.match.params.store
    axios.get(apiURl)
      .then((res) => {
        let title = null
        if (this.props.match.params.store == 0) {
          title = <Typography variant="h5">Asset Store - IP Devices</Typography>
        }
        else {
          title = <Typography variant="h5">"Asset Store - Non IP Devices"</Typography>
        }
        this.setState({
          data: res.data.assets,
          title: title,
          loading: false,
        })
      })
      .catch((err) => {
        console.log("Error")
      })
  }


  render() {
    if (this.state.loading === true) {
      return <LinearProgress />
    }
    return (
      <div style={{ backgroundColor: "#eeeeee" }}>
        <Navbar />
        <Card style={{ margin: "70px" }} elevation={10}>
          <DataTable
            title={this.state.title}
            columns={columns}
            data={this.state.data}
            sortIcon={<SortIcon />}
            pagination
          />
        </Card>
      </div>
    )
  }
}
export default AssetStore;
