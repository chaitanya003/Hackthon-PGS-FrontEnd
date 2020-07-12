import React, {useEffect} from "react";
import DataTable from "react-data-table-component";
import {useDispatch, useSelector} from "react-redux";
import "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import './styles.css';
import "bootstrap";
import Navbar from './components/navbar'
import {Button, Card, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from '@material-ui/core'
import * as axios from "axios";
import setData from "./actions/setData";
import {withStyles} from "@material-ui/core/styles"

const StyledButton = withStyles({
    root: {
      background: 'linear-gradient(45deg, #2196f3 30%, #0d47a1 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 40,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
      textTransform: 'capitalize',
    },
  })(Button);

const FilterComponent = ({ filterText, filterBy, onFilter, onClear, handleFilterBy }) => (
    <>
        <TextField variant="outlined" style={{ margin: "10px" }} id="search" type="text" placeholder="Filter" value={filterText} onChange={onFilter} />
        <FormControl style={{ margin: "10px" }}>
            <InputLabel id="select-filter">Filter By</InputLabel>
            <Select
                labelId="select-filter"
                id="filterBy"
                value={filterBy}
                onChange={handleFilterBy}
            >
                <MenuItem value="employeeName">Employee Name</MenuItem>
                <MenuItem value="assetName">Asset Name</MenuItem>
                <MenuItem value="serialNo">Serial No</MenuItem>
                <MenuItem value="faultType">Fault Type</MenuItem>
                <MenuItem value="faultDescription">Fault Desc</MenuItem>
                <MenuItem value="faultDate">Fault Date</MenuItem>
            </Select>
        </FormControl>
        <StyledButton type="button" onClick={onClear} size="large" style={{ margin: "10px", backgroundColor: "#1976d2", color: "white" }}>CLEAR</StyledButton>
    </>
);

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
            let uri = 'http://pgshackathon-env.eba-smftmkmh.us-east-2.elasticbeanstalk.com/asset/allocation/fault/details?bu=' + entryValue + '&prod=' + productData + '&start=' + start + '&end=' + end + '&year=' + year;
            console.log("URI= ", uri);
            response = await axios.get(uri)
        }

        f().then(() => {
            let val = response.data.faultDetails;
            console.log("Value = ", val);
            dispatch(setData({payload: val}));
        });

    }, []);
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
    const [filterText, setFilterText] = React.useState('');
    const [filterBy, setFilterBy] = React.useState('employeeName');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);

    let filterdata = data1
    if (filterBy === "assetName")
        filterdata = data1.filter(item => item.assetName && item.assetName.toLowerCase().includes(filterText.toLowerCase()));
    else if (filterBy === "employeeName")
        filterdata = data1.filter(item => item.employeeName && item.employeeName.toLowerCase().includes(filterText.toLowerCase()));
    else if (filterBy === "serialNo")
        filterdata = data1.filter(item => item.serialNo && String(item.serialNo).toLowerCase().includes(filterText.toLowerCase()));
    else if (filterBy === "faultType")
        filterdata = data1.filter(item => item.faultType && String(item.faultType).toLowerCase().includes(filterText.toLowerCase()));
    else if (filterBy === "faultDescription")
        filterdata = data1.filter(item => item.faultDescription && item.faultDescription.toLowerCase().includes(filterText.toLowerCase()));
    else if (filterBy === "faultDate")
        filterdata = data1.filter(item => item.faultDate && String(item.faultDate).toLowerCase().includes(filterText.toLowerCase()));

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return <FilterComponent onFilter={e => setFilterText(e.target.value)} handleFilterBy={e => setFilterBy(e.target.value)} onClear={handleClear} filterText={filterText} filterBy={filterBy} />;
    }, [filterText, resetPaginationToggle]);

    console.log(filterBy)

    return (

        <div style={{ backgroundColor: "#e3f2fd" }}>
            <Navbar />
            <Card style={{ margin: "5%" }} elevation={10}>
                <DataTable
                    title={ <Typography variant="h6">FAULT DETAILS</Typography>}
                    columns={columns}
                    data={filterdata}
                    pagination
                    defaultSortField={'title'}
                    paginationResetDefaultPage={resetPaginationToggle}
                    subHeader
                    subHeaderComponent={subHeaderComponentMemo}
                />
            </Card>
        </div>

    )
}

export default DataDetails;