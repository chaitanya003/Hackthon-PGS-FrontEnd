import React from 'react';
import { Button, Grid, Card, CardContent, Typography, LinearProgress } from '@material-ui/core'
import BarChartIcon from '@material-ui/icons/BarChart';
import StoreIcon from '@material-ui/icons/Store';
import FeedbackIcon from '@material-ui/icons/Feedback';
import Navbar from './components/navbar'
import Allocation from './components/dashboard/allocationPie'
import Survey from './components/dashboard/surveyGraphs';
import { Link } from 'react-router-dom'
import {createStore} from "redux";
import {Provider} from "react-redux";
import allReducers from "./reducers";
import FaultGraph from "./Graph";
import axios from 'axios';
class App extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      data:null,
      subdata:null,
      loading:true,
    }
  }

  componentDidMount(){
    let apiUrl = '/asset/allocation';
    axios.get(apiUrl)
      .then((response) => {
        let data = []
        for (let i in response.data.assets[0].allocation) {
          let item = {}
          item.id = response.data.assets[0].allocation[i].buId
          item.name = response.data.assets[0].allocation[i].buName
          item.value = response.data.assets[0].allocation[i].unitsAllocation
          data.push(item)
        }
        this.setState({
          data: data,
          loading: false,
        })
      })
      .catch((err) => {
        console.log("Error")
      })
  }

  render() {


    const store=createStore(allReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    if(this.state.loading === true){
      return <LinearProgress/>
    }
    return (
      <div style={{ backgroundColor: "#e1f5fe" }}>
          <Navbar />
          <Grid container style={{ marginTop: "30px" }} spacing={2}>
            <Grid item xs={8} container direction="column" spacing={2}>
              <Grid item >
                <Card variant="outlined" >
                  <CardContent>
                    <Typography variant="h4"><BarChartIcon /> Allocation </Typography>
                    <Allocation value ={ this.state.data} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h4"><FeedbackIcon/> Fault Ratio</Typography>
                    <Provider store={store}>
                      <FaultGraph />
                    </Provider>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={4} container direction="column" spacing={2} >
              <Grid item >
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6"><StoreIcon /> Asset Store  <Link to="/asset/0" style={{ color: 'inherit', textDecoration: 'inherit' }}><Button variant="contained" style={{backgroundColor:"#1976d2", color:"white"}} size="small">IP Devices</Button></Link> <Link to="/asset/1" style={{ color: 'inherit', textDecoration: 'inherit' }}><Button variant="contained" color="secondary" size="small">Non IP Devices</Button></Link></Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Card variant="outlined" style={{maxHeight:"100%"}}>
                <CardContent>
                  <Survey />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
      </div>
    );
  }
}

export default App;
