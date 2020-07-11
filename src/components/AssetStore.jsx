import React from 'react';
import DataTable from 'react-data-table-component';
import { Typography, LinearProgress, TextField, Button, FormControl, MenuItem, Select, InputLabel } from '@material-ui/core';
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

const FilterComponent = ({ filterText, filterBy ,onFilter, onClear, handleFilterBy }) => (
  <>
    <TextField variant="outlined" style={{margin:"10px"}} id="search" type="text" placeholder="Filter" value={filterText} onChange={onFilter} />
    <FormControl style={{margin:"10px"}}>
        <InputLabel id="select-filter">Filter By</InputLabel>
        <Select
          labelId="select-filter"
          id="filterBy"
          value={filterBy}
          onChange={handleFilterBy}
        >
          <MenuItem value="assetName">Asset Name</MenuItem>
          <MenuItem value="assetId">Asset ID</MenuItem>
          <MenuItem value="serialNumber">Serial No</MenuItem>
          <MenuItem value="status">Status</MenuItem>
        </Select>
      </FormControl>
    <Button type="button" onClick={onClear} size="large" style={{margin:"10px", backgroundColor:"#1976d2", color:"white"}}>Clear</Button>
  </>
);

class AssetStore extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: null,
      title: "",
      loading: true,
      filterText:"",
      filterBy:"assetName",
      resetPagination:false,
    }
  }

  componentDidMount() {
    let apiURl = 'http://pgshackathon-env.eba-smftmkmh.us-east-2.elasticbeanstalk.com/asset/allocation/store?store=' + this.props.match.params.store
    axios.get(apiURl)
      .then((res) => {
        let title = null
        if (this.props.match.params.store == 0) {
          title = <Typography variant="h5">Asset Store - IP Devices</Typography>
        }
        else {
          title = <Typography variant="h5">Asset Store - Non IP Devices</Typography>
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

  handleClear = () => {
    if (this.state.filterText) {
      this.setState({
        resetPagination:!this.state.resetPagination,
        filterText:"",
      })
    }
  }
  handleFilter = (e) => {
    this.setState({
      filterText:e.target.value,
    })
  }

  handleFilterBy = (e) => {
    this.setState({
      filterBy:e.target.value,
    })
  }

  render() {
    if (this.state.loading === true) {
      return <LinearProgress />
    }
    let filterdata = this.state.data
    if(this.state.filterBy === "assetName")
      filterdata = this.state.data.filter(item => item.assetName && item.assetName.toLowerCase().includes(this.state.filterText.toLowerCase()));
    else if(this.state.filterBy === "assetId")
      filterdata = this.state.data.filter(item => item.assetId && String(item.assetId).toLowerCase().includes(this.state.filterText.toLowerCase())); 
    else if(this.state.filterBy === "serialNumber")
      filterdata = this.state.data.filter(item => item.serialNumber && String(item.serialNumber).toLowerCase().includes(this.state.filterText.toLowerCase()));      
    else if(this.state.filterBy === "status"){
      if(this.state.filterText.toLowerCase() === "allotted" || this.state.filterText.toLowerCase() === "unallotted")
        filterdata = this.state.data.filter(item => item.status && item.status.toLowerCase() === this.state.filterText.toLowerCase());
      }  
      return (
      <div style={{ backgroundColor: "#e1f5fe" }}>
        <Navbar />
        <Card style={{ margin: "70px" }} elevation={10}>
          
          <DataTable
            title={this.state.title}
            columns={columns}
            data={filterdata}
            sortIcon={<SortIcon />}
            pagination
            paginationResetDefaultPage={this.state.resetPagination}
            subHeader={true}
            subHeaderComponent={
              (
                <FilterComponent style={{float:"right"}} onFilter={this.handleFilter} handleFilterBy={this.handleFilterBy} onClear={this.handleClear} filterText={this.state.filterText} filterBy={this.state.filterBy}/>
              )
            }
            subHeaderAlign="right"
          />
        </Card>
      </div>
    )
  }
}
export default AssetStore;
