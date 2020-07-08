import React from 'react';
import DataTable from 'react-data-table-component';
import { Button, Typography, LinearProgress } from '@material-ui/core';
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
    selector: 'serialNumber',
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

  
  
  


 class Survey extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        data:[{assetId:1, assetType:"Laptop", assetName:"HP Pavilion", serialNumber:12345, employeeName:"Hemant Pardeshi", employeeEmail:"hmnt@gmail.com"},{assetId:2, assetType:"Laptop", assetName:"HP Pavilion", serialNumber:12345, employeeName:"Hemant Pardeshi", employeeEmail:"hmnt@gmail.com"}],
        title:<Typography variant="h5">Survey</Typography>,
      }
      this.convertArrayOfObjectsToCSV = this.convertArrayOfObjectsToCSV.bind(this);
      this.downloadCSV = this.downloadCSV.bind(this);

    }
    

    componentDidMount(){
    //   let apiURl = '/asset/allocation/store?store=' + this.props.match.params.store 
    //   axios.get(apiURl)
    //     .then((res) =>{
    //       let title = null
    //       if(this.props.match.params.store == 1){
    //         title = <Typography variant="h5">Asset Store - IP Devices</Typography>
    //       }
    //       else{
    //         title = <Typography variant="h5">"Asset Store - Non IP Devices"</Typography>
    //       }
    //       this.setState({
    //         data:res.data.assets,
    //         title:title,
    //         loading:false,
    //       })
    //     })
    //     .catch((err) =>{
    //         console.log("Error")
    //     })
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
      
      // Blatant "inspiration" from https://codepen.io/Jacqueline34/pen/pyVoWr
      downloadCSV() {
        const link = document.createElement('a');
        let csv = this.convertArrayOfObjectsToCSV(this.state.data);
        if (csv == null) return;
      
        const filename = 'export.csv';
      
        if (!csv.match(/^data:text\/csv/i)) {
          csv = `data:text/csv;charset=utf-8,${csv}`;
        }
      
        link.setAttribute('href', encodeURI(csv));
        link.setAttribute('download', filename);
        link.click();
      }
    

    render(){
      if(this.state.loading === true){
        return <LinearProgress/>
      }
        return (
            <div style={{backgroundColor:"#eeeeee"}}> 
            <Navbar/>
            <Card style={{margin:"70px"}} elevation={10}>
            <Button  style={{float:"right", margin:"10px"}} color="primary" variant="contained" onClick={this.downloadCSV}>Export</Button>
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
export default Survey;