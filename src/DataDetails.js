import React, {useEffect} from "react";
import DataTable from "react-data-table-component";
import {useDispatch, useSelector} from "react-redux";
import "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';
import "bootstrap";
import Navbar from './components/navbar'
import {Card} from '@material-ui/core'
import * as axios from "axios";
import setData from "./actions/setData";

function DataDetails(props) {

    const dispatch = useDispatch();
    const data1 = useSelector(state => state.setDataReducer);

    useEffect(() => {
        let response;

        async function f() {
            let entryValue = props.match.params.entryValue;
            let productData = props.match.params.productData;
            let start = props.match.params.start;
            let end = props.match.params.end;
            let year = props.match.params.year;
            let uri = '/asset/allocation/fault/details?bu=' + entryValue + '&prod=' + productData + '&start=' + start + '&end=' + end + '&year=' + year;
            console.log("URI= ", uri);
            response = await axios.get(uri)
        }

        f().then(() => {
            let val = response.data.faultDetails;
            console.log("Value = ", val);
            dispatch(setData({payload: val}));
        });

    });
    const columns = [
        {
            name: "Employee Name",
            selector: "employeeName",
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
            name: "Fault Type ",
            selector: "faultType",
            sortable: true
        },
        {
            name: "Fault Description",
            selector: "faultDescription",
            sortable: true
        },
        {
            name: "Fault Date",
            selector: "faultDate",
            sortable: true
        }

    ];


    return (

        <div style={{backgroundColor: "#eeeeee"}}>

            <Navbar/>
            <Card style={{margin: "70px"}} elevation={10}>
                <DataTable
                    title={" Fault Details"}
                    columns={columns}
                    data={data1}
                    pagination
                    defaultSortField={'title'}
                />
            </Card>
        </div>

    )
}

export default DataDetails;