import React, {useEffect, useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Brush, ReferenceLine} from 'recharts';
import {Card, CardBody, CardTitle, CardText, Button, Row, Col} from "reactstrap";
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import TagsInput from "react-tagsinput";
import 'react-tagsinput/react-tagsinput.css'
import setTag from "./actions/setTag";
import {useDispatch, useSelector} from "react-redux";
import * as axios from "axios";
import setInitialData from "./actions/setInitialData";
import {useHistory} from 'react-router-dom';
import setData from "./actions/setData";
import setPage from "./actions/setPage";
import DataDetails from "./DataDetails";
// let requestBody = [];




function Graph() {
    const history = useHistory();
    const [flag1, setFlag1] = useState(false);
    const [flag2, setFlag2] = useState(false);
    const [productValue, setProductValue] = useState("");
    const [timePeriodValue, setTimePeriodValue] = useState("");
    let entryValues = [], tagArray = [];
    const [entryValue, setEntryValues] = useState([]);
    let entries = ["Computer", "Electronics", "Chemical", "Production", "Mechanical"];
    const BU = new Map([["Computer", "1"], ["Electronics", "2"], ["Chemical", "3"], ["Production", "4"], ['Mechanical', '5']]);
    const Product = new Map([["Keyboard", "0"], ["Monitor", "1"], ["Mouse", "2"], ["Laptop", "3"]])
    const Time = new Map([["monthly", "1"], ["semi-annually", "2"], ["annually", "3"]]);
    let responseBody = [];
    const dispatch = useDispatch();
    let str1, str2;
    useEffect(() => {
        async function f() {
            const defaultBU = [1, 2, 3, 4, 5];
            const defaultProduct = 3;
            const defaultTimePeriod = "1";
            let uri = 'http://localhost:4000/asset/allocation/fault/' + defaultBU + '/' + defaultProduct + '/' + defaultTimePeriod;
            await axios.get(uri).then(res => responseBody = (res.data));
        }

        f().then(() => {
            responseBody.map((props) => {
                let obj = {
                    label: props.label,
                    unitsAllocated: props.unitsAllocated,
                    faultyUnits: props.faultyUnits
                }
                dispatch(setInitialData({type: 'Initial', payload: obj}))
                return 1;
            });
        });

    }, []);

    let arr = [];
    let data = [];
    let tag = useSelector(state => state.tagReducer);
    tag.map((props) => arr.push(props.tag));

    data = useSelector(state => state.initialDataReducer);
    return (

        <div name={"MyDiv"}>
            <Row>
                <Col>
                    <Card id={'card'}>
                        <CardTitle>Prajwal component</CardTitle>
                    </Card>

                </Col>

                <Col sm={'6'}>
                    <Card>
                        <Button>IP Assets</Button><br/>
                        <Button>Non IP Assets</Button><br/>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col sm={'6'}>

                    <Card className={'card'} name={"card1"}>
                        <CardTitle className={'cardTitle'} name={"card2"}>Fault Tolerance Graph</CardTitle>
                        <Row>
                            <Col sm={'3'}>
                                <select name={"Options"} id={"businessUnits"} onChange={(e) => {
                                    let val = (e.target.value);
                                    dispatch(setTag({type: 'Tag', payload: val}))
                                }}>
                                    <option style={{display: "none"}}>Business Unit</option>
                                    <option value={"Computer"}>Computer</option>
                                    <option value={"Electronics"}>Electronics</option>
                                    <option value={"Chemical"}>Chemical</option>
                                    <option value={"Mechanical"}>Mechanical</option>
                                    <option value={"Production"}>Production</option>
                                </select>
                            </Col>

                            <Col sm={'3'}>
                                <select name={"Options1"} id={"products"} onChange={(e) => {
                                    let val = (e.target.value);
                                    if (flag1 === false) {
                                        dispatch(setTag({type: 'Tag', payload: val}))
                                        setFlag1(true);
                                        setProductValue(val);
                                    }

                                }}>
                                    <option style={{display: "none"}}>Products</option>
                                    <option value={"Keyboard"}>Keyboard</option>
                                    <option value={"Monitor"}>Monitor</option>
                                    <option value={"Mouse"}>Mouse</option>
                                    <option value={"Laptop"}>Laptop</option>
                                </select>
                            </Col>

                            <Col sm={'3'}>
                                <select name={"Options2"} id={"timePlan"} onChange={(e) => {
                                    let val = (e.target.value);
                                    if (flag2 === false) {
                                        dispatch(setTag({type: 'Tag', payload: val}))
                                        setFlag2(true);
                                        setTimePeriodValue(val);
                                    }
                                }}>
                                    <option style={{display: "none"}} value={""}>Time Period</option>
                                    <option value={"monthly"}>monthly</option>
                                    <option value={"semi-annually"}>semi-annually</option>
                                    <option value={"annually"}>annually</option>
                                </select>
                            </Col>

                            <Col sm={'3'}>
                                <button onClick={async () => {
                                    await arr.map((props) => {
                                        if (entries.includes(props) === true)
                                            entryValues.push(BU.get(props));
                                    })
                                    setEntryValues(entryValues);
                                    const productData = Product.get(productValue);
                                    let timePeriodValueNew;
                                    timePeriodValueNew = Time.get(timePeriodValue);
                                    console.log("Time Period =", timePeriodValue);
                                    let uri = 'http://localhost:4000/asset/allocation/fault2/' + entryValues + '/' + productData + '/' + timePeriodValueNew;
                                    await axios.get(uri).then(res => responseBody = (res.data));

                                    await responseBody.map((props) => {
                                        let obj = {
                                            label: props.label,
                                            unitsAllocated: props.unitsAllocated,
                                            faultyUnits: props.faultyUnits
                                        }
                                        dispatch(setInitialData({type: 'After', payload: obj}))
                                    });

                                }}>Submit
                                </button>
                            </Col>

                            <TagsInput onChange={(e) => {
                                dispatch(setTag({type: 'Filter', payload: " ", arr: e}))
                                setFlag2(false);
                                setFlag1(false);


                            }} value={arr}/>

                        </Row>
                        <BarChart width={700} height={400} data={data} onClick={(data) => {
                        }}>
                            <XAxis dataKey="label" stroke="#8884d8"/>
                            <YAxis/>
                            <Tooltip wrapperStyle={{width: 180, backgroundColor: '#ccc'}}/>
                            {/*<Legend/>*/}
                            {/*<Legend width={100} wrapperStyle={{ top: 40, right: 20, backgroundColor: '#f5f5f5', border: '1px solid #d5d5d5', borderRadius: 3, lineHeight: '40px' }} />*/}
                            {/* <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />*/}
                            <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
                            <ReferenceLine y={0} stroke='#000'/>
                            <Brush dataKey='label' height={30} stroke="#8884d8"/>
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
                                console.log("Entry Values= ", entryValue);
                                console.log("Product Value= ", productValue);
                                const productData = Product.get(productValue);
                                console.log("Product Data= ", productData);

                                let uri = 'http://localhost:4000/asset/allocation/fault/details/' + entryValue + '/' + productData + '/' + start + '/' + end + '/' + year;
                                const response = await axios.get(uri);
                                dispatch(setData({payload: response.data}))
                                history.push('/faultdetails');
                            }} stackId={'a'} dataKey="unitsAllocated" fill="#8884d8" barSize={30}/>
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
                                console.log("Entry Values= ", entryValue);
                                console.log("Product Value= ", productValue);
                                const productData = Product.get(productValue);
                                console.log("Product Data= ", productData);

                                let uri = 'http://localhost:4000/asset/allocation/fault/details/' + entryValue + '/' + productData + '/' + start + '/' + end + '/' + year;
                                const response = await axios.get(uri);
                                dispatch(setData({payload: response.data}))
                                history.push('/faultdetails');
                            }}
                                 dataKey="faultyUnits" fill="red" barSize={30}/>
                        </BarChart>


                    </Card>

                </Col>
            </Row>

        </div>
    );

}

export default Graph;


///discuss some doubts first about the  url for details of table and response and accordingly dispatch the action / /