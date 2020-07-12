import React, { useEffect, useState } from 'react';
import { Bar, BarChart, Brush, Legend, ReferenceLine, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { Row } from "reactstrap";
import 'bootstrap/dist/css/bootstrap.css';
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css'
import setTag from "./actions/setTag";
import { useDispatch, useSelector } from "react-redux";
import * as axios from "axios";
import setInitialData from "./actions/setInitialData";
import { useHistory } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, Button } from "@material-ui/core";
import { makeStyles, withStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
}));

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #5893d8 30%, #53bbc9 90%)',
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

function Graph() {
    const classes = useStyles();
    const history = useHistory();
    const [productValue, setProductValue] = useState("");
    const [timePeriodValue, setTimePeriodValue] = useState("");
    let entryValues = [];
    let [entryValue, setEntryValues] = useState([]);
    let entries = ["Computer", "Electronics", "Chemical", "Production", "Mechanical"];
    const BU = new Map([["Computer", "1"], ["Electronics", "2"], ["Chemical", "3"], ["Production", "4"], ['Mechanical', '5']]);
    const Product = new Map([["Keyboard", "0"], ["Monitor", "1"], ["Mouse", "2"], ["Laptop", "3"]])
    const Time = new Map([["monthly", "1"], ["semi-annually", "2"], ["annually", "3"]]);
    let responseBody = [];
    const dispatch = useDispatch();
    useEffect(() => {
        async function f() {
            const defaultBU = [1, 2, 3, 4, 5];
            const defaultProduct = 3;
            const defaultTimePeriod = "1";
            let uri = 'http://pgshackathon-env.eba-smftmkmh.us-east-2.elasticbeanstalk.com/asset/allocation/fault?bu=' + defaultBU + '&prod=' + defaultProduct + '&time=' + defaultTimePeriod;
            const response = await axios.get(uri);
            responseBody = response.data;
        }

        f().then(() => {
            console.log(responseBody);
            const res = responseBody.faultDetails.map((props) => {
                return {
                    label: props.label,
                    unitsAllocated: props.unitsAllocated,
                    faultyUnits: props.faultyUnits
                };
            });
            dispatch(setInitialData({ type: "Initial", payload: res }))
        });

    }, []);

    let arr = [];
    let data;
    let tag = useSelector(state => state.tagReducer);
    tag.map((props) => arr.push(props.tag));
    data = useSelector(state => state.initialDataReducer);

    return (

        <div>
            <Row>
                <Row style={{ marginLeft: "50px" }}>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="selectBU">Business Unit</InputLabel>
                        <Select
                            labelId="selectBU"
                            id={"businessUnits"}
                            onChange={(e) => {
                                let val = (e.target.value);
                                if (!arr.includes(val)) {
                                    dispatch(setTag({ type: 'Tag', payload: val }))

                                }
                            }}
                        >
                            <MenuItem value={"Computer"}>Computer</MenuItem>
                            <MenuItem value={"Electronics"}>Electronics</MenuItem>
                            <MenuItem value={"Chemical"}>Chemical</MenuItem>
                            <MenuItem value={"Mechanical"}>Mechanical</MenuItem>
                            <MenuItem value={"Production"}>Production</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="selectProd">Products</InputLabel>
                        <Select
                            labelId="selectProd"
                            id={"products"}
                            onChange={(e) => {
                                let val = (e.target.value);
                                if (!arr.includes('Keyboard') && !arr.includes('Monitor') && !arr.includes('Laptop') && !arr.includes('Mouse')) {
                                    dispatch(setTag({ type: 'Tag', payload: val }))
                                    setProductValue(val);
                                }

                            }}
                        >
                            <MenuItem value={"Keyboard"}>Keyboard</MenuItem>
                            <MenuItem value={"Monitor"}>Monitor</MenuItem>
                            <MenuItem value={"Mouse"}>Mouse</MenuItem>
                            <MenuItem value={"Laptop"}>Laptop</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel id="selectTime">Time</InputLabel>
                        <Select
                            labelId="selectTime"
                            id="timePlan"
                            onChange={(e) => {
                                let val = (e.target.value);
                                if (!arr.includes('monthly') && !arr.includes('semi-annually') && !arr.includes('annually')) {
                                    dispatch(setTag({ type: 'Tag', payload: val }))
                                    setTimePeriodValue(val);
                                }
                            }}
                        >
                            <MenuItem value={"monthly"}>monthly</MenuItem>
                            <MenuItem value={"semi-annually"}>semi-annually</MenuItem>
                            <MenuItem value={"annually"}>annually</MenuItem>
                        </Select>
                    </FormControl>

                    <StyledButton style={{ maxHeight: '30px', minHeight: '30px', backgroundColor: "#207a87", color: "white" }}
                        className={classes.formControl} variant="contained" onClick={async () => {
                            await arr.map((props) => {
                                if (entries.includes(props) === true)
                                    entryValues.push(BU.get(props));
                            })
                            setEntryValues(entryValues);
                            const productData = Product.get(productValue);
                            let timePeriodValueNew;
                            timePeriodValueNew = Time.get(timePeriodValue);
                            let uri = 'http://pgshackathon-env.eba-smftmkmh.us-east-2.elasticbeanstalk.com/asset/allocation/fault?bu=' + entryValues + '&prod=' + productData + '&time=' + timePeriodValueNew;
                            const response = await axios.get(uri);
                            responseBody = response.data;
                            const res = responseBody.faultDetails.map((props) => {
                                return {
                                    label: props.label,
                                    unitsAllocated: props.unitsAllocated,
                                    faultyUnits: props.faultyUnits
                                };
                            });
                            dispatch(setInitialData({ type: "Initial", payload: res }));

                        }}>SUBMIT
                    </StyledButton><br />

                    <TagsInput onChange={(e) => {
                        dispatch(setTag({ type: 'Filter', payload: " ", arr: e }))
                    }} value={arr} />
                </Row>
                <ResponsiveContainer width="90%" height={400}>
                <BarChart data={data}>
                    <XAxis dataKey="label" stroke="#60d5a8" />
                    <YAxis />
                    <Tooltip wrapperStyle={{ width: 180, backgroundColor: '#ccc' }} />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke='#000' />
                    <Brush dataKey='label' height={30} stroke="#60d5a8" />
                    <Bar onClick={async (e) => {
                        let start, end, year;
                        let str1 = (e.label).split('-')
                        if (str1.length === 1) {
                            start = str1[0].split(" ");
                            year = start[1];
                            start = start[0];
                            end = start;
                        } else {
                            start = str1[0];
                            end = str1[1].split(" ");
                            year = end[1];
                            end = end[0];
                        }
                        if (entryValue.length === 0) {
                            entryValue = [1, 2, 3, 4, 5];
                        }
                        console.log("Product Value= ", productValue);
                        let productData = Product.get(productValue);
                        if (productData === undefined)
                            productData = 3;
                        let pageURL = '/faultdetails/' + entryValue + '/' + productData + '/' + start + '/' + end + '/' + year;
                        history.push(pageURL);

                    }} stackId={'a'} dataKey="unitsAllocated" fill="#207a87" barSize={30} />
                    <Bar onClick={async (e) => {
                        let start, end, year;
                        let str1 = (e.label).split('-')
                        if (str1.length === 1) {
                            start = str1[0].split(" ");
                            year = start[1];
                            start = start[0];
                            end = start;
                        } else {
                            start = str1[0];
                            end = str1[1].split(" ");
                            year = end[1];
                            end = end[0];
                        }

                        if (entryValue.length === 0) {
                            entryValue = [1, 2, 3, 4, 5];
                        }
                        let productData = Product.get(productValue);
                        if (productData === undefined)
                            productData = 3;
                        let pageURL = '/faultdetails/' + entryValue + '/' + productData + '/' + start + '/' + end + '/' + year;
                        history.push(pageURL);
                    }} dataKey="faultyUnits" fill="#60d5a8" barSize={30} />
                </BarChart>
                </ResponsiveContainer>
            </Row>

        </div>

    );

}

export default Graph;
