import React from "react";
import DataTable from "react-data-table-component";
import {useSelector} from "react-redux";
import "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';
import "bootstrap";
import Navbar from './components/navbar'
import {Card} from '@material-ui/core'

function DataDetails() {

    let details=useSelector(state => state.setDataReducer);
    console.log("Details = ",details);
    const columns = [
        {
           name:"Employee Name",
           selector:"employeeName",
            sortable: true
        },

        {
        name: "Asset Name",
        selector: "assetName",
        sortable: true
    },
        {
            name: "Serial No",
            selector: "serialNo",
            sortable: true
        },
        {
           name:"Fault Type ",
           selector:"faultType" ,
           sortable: true
        },
        {
           name:"Fault Description",
           selector:"faultDescription",
           sortable:true
        },
        {
           name:"Fault Date",
           selector:"faultDate" ,
           sortable: true
        }

    ];

    // const data = [{
    //     id: 1,
    //     title: "Fault in the Stars",
    //     author: "Girish"
    // }, {
    //     id: 2,
    //     title: "2 States",
    //     author: "Gautam"
    // }]
const data=details;
    console.log(data)
    return (
        <div style={{backgroundColor:"#eeeeee"}}> 
            <Navbar/>
            <Card style={{margin:"70px"}} elevation={10}>
                <DataTable
                    title={" Fault Details"}
                    columns={columns}
                    data={data}
                    pagination
                    defaultSortField={'title'}
                />
            </Card>
        </div>

    )
}

export default DataDetails;