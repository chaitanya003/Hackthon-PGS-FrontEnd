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

  
  
  


 class Survey extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        data:null,
        title:"",
        loading:true,
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
    

    render(){
      if(this.state.loading === true){
        return <LinearProgress/>
      }
        return (
            <div style={{backgroundColor:"#eeeeee"}}> 
            <Navbar/>
            <Card style={{margin:"70px"}} elevation={10}>
            <Button  style={{float:"right", margin:"10px", backgroundColor:"#1976d2", color:"white"}}  variant="contained" onClick={this.downloadCSV}>Export</Button>
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