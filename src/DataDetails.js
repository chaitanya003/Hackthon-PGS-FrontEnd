import React from "react";
import DataTable from "react-data-table-component";
import {useSelector} from "react-redux";
import "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';
import "bootstrap";

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

    return (
        <div className={"App"}>
            <div className={"card"}>
                <DataTable
                    title={"Details"}
                    columns={columns}
                    data={data}
                    pagination
                    defaultSortField={'title'}
                />


            </div>

        </div>

    )
}

export default DataDetails;