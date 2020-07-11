import React from 'react';
import DataTable from 'react-data-table-component';
import { Button, Typography, LinearProgress, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
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
    name: 'Asset Type',
    selector: 'assetType',
    sortable: true,
  },
  {
    name: 'Serial Number',
    selector: 'serialNo',
    sortable: true,
  },
  {
    name: 'Asset Name',
    selector: 'assetName',
    sortable: true,
  },
  {
    name: 'Employee Name',
    selector: 'employeeName',
    sortable: true,
  },
  {
    name: 'Employee Email',
    selector: 'employeeEmail',
    sortable: true,
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
          <MenuItem value="assetType">Asset Type</MenuItem>
          <MenuItem value="serialNo">Serial No</MenuItem>
          <MenuItem value="employeeName">Employee Name</MenuItem>
          <MenuItem value="employeeEmail">EmailID</MenuItem>
        </Select>
      </FormControl>
    <Button type="button" onClick={onClear} size="large" style={{margin:"10px", backgroundColor:"#1976d2", color:"white"}}>Clear</Button>
  </>
);
  


 class Survey extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        data:null,
        title:"",
        loading:true,
        filterText:"",
        filterBy:"assetName",
        resetPagination:false,
      }
      this.convertArrayOfObjectsToCSV = this.convertArrayOfObjectsToCSV.bind(this);
      this.downloadCSV = this.downloadCSV.bind(this);

    }
    

    componentDidMount(){
      let apiURl = 'http://pgshackathon-env.eba-smftmkmh.us-east-2.elasticbeanstalk.com/asset/allocation/survey/details?id=' + this.props.match.params.id 
      axios.get(apiURl)
        .then((res) =>{
          let title = null
          title="XYZ"
          title = <Typography variant = "h5">Survey {this.props.match.params.date}</Typography>
          this.setState({
            data:res.data.survey,
            title:title,
            loading:false,
          })
        })
        .catch((err) =>{
            console.log("Error")
        })
    }

    convertArrayOfObjectsToCSV = (array) => {
        let result;
      
        const columnDelimiter = ',';
        const lineDelimiter = '\n';
        const keys = Object.keys(this.state.data[0]);
      
        result = '';
        result += keys.join(columnDelimiter);
        result += lineDelimiter;
      
        array.forEach(item => {
          let ctr = 0;
          keys.forEach(key => {
            if (ctr > 0) result += columnDelimiter;
      
            result += item[key];
            
            ctr++;
          });
          result += lineDelimiter;
        });
      
        return result;
      }
      
      downloadCSV() {
        const link = document.createElement('a');
        let csv = this.convertArrayOfObjectsToCSV(this.state.data);
        if (csv == null) return;
      
        const filename = 'survey' + this.props.match.params.date + '.csv';
      
        if (!csv.match(/^data:text\/csv/i)) {
          csv = `data:text/csv;charset=utf-8,${csv}`;
        }
      
        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
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
    

    render(){
      if(this.state.loading === true){
        return <LinearProgress/>
      }
      let filterdata = this.state.data
      if(this.state.filterBy === "assetName")
        filterdata = this.state.data.filter(item => item.assetName && item.assetName.toLowerCase().includes(this.state.filterText.toLowerCase()));
      if(this.state.filterBy === "assetType")
        filterdata = this.state.data.filter(item => item.assetType && item.assetType.toLowerCase().includes(this.state.filterText.toLowerCase()));
      else if(this.state.filterBy === "assetId")
        filterdata = this.state.data.filter(item => item.assetId && String(item.assetId).toLowerCase().includes(this.state.filterText.toLowerCase())); 
      else if(this.state.filterBy === "serialNo")
        filterdata = this.state.data.filter(item => item.serialNo && String(item.serialNo).toLowerCase().includes(this.state.filterText.toLowerCase()));
      else if(this.state.filterBy === "employeeName")
        filterdata = this.state.data.filter(item => item.employeeName && item.employeeName.toLowerCase().includes(this.state.filterText.toLowerCase()));        
      else if(this.state.filterBy === "employeeEmail")
        filterdata = this.state.data.filter(item => item.employeeEmail && item.employeeEmail.toLowerCase().includes(this.state.filterText.toLowerCase()));        
        return (
            <div style={{backgroundColor:"#eeeeee"}}> 
            <Navbar/>
            <Card style={{margin:"70px"}} elevation={10}>
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
                  <>
                  <FilterComponent style={{float:"right"}} onFilter={this.handleFilter} handleFilterBy={this.handleFilterBy} onClear={this.handleClear} filterText={this.state.filterText} filterBy={this.state.filterBy}/>
                  <Button  style={{float:"right", margin:"10px", backgroundColor:"#386e3c", color:"white"}}  size="large" variant="contained" onClick={this.downloadCSV}>Export</Button>
                  </>
                )
              }
              subHeaderAlign="right"
            />
            </Card>
            </div>
          )
    }
}
export default Survey;
