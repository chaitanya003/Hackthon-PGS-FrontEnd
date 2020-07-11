import React from 'react';
import { Button, Grid, Card, CardContent, Typography, LinearProgress } from '@material-ui/core'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import BarChartIcon from '@material-ui/icons/BarChart';
import PieChartIcon from '@material-ui/icons/PieChart';
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
    let apiUrl = 'http://pgshackathon-env.eba-smftmkmh.us-east-2.elasticbeanstalk.com/asset/allocation';
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
      .catch(() => {
        console.log("Error")
      })
  }

  render() {

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
  const StyledButton1 = withStyles({
    root: {
        background: 'linear-gradient(45deg, #4caf50 30%, #1b5e20 90%)',
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

    const store=createStore(allReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    if(this.state.loading === true){
      return <LinearProgress/>
    }
    return (
        <Provider store={store}>
      <div style={{ backgroundColor: "#e1f5fe" }}>
          <Navbar />
          <Grid container style={{ marginTop: "20px", paddingLeft: 10}} spacing={2}>
            <Grid item xs={8} container direction="column" spacing={2}>
              <Grid item>
                <Card variant="outlined" >
                  <CardContent>
                    <Typography variant="h6"><PieChartIcon /> ALLOCATION </Typography>
                    <Allocation value ={ this.state.data} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6"><FeedbackIcon/> FAULT RATIO</Typography>

                      <FaultGraph />
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={4} container direction="column" spacing={2} >
              <Grid item>
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6"><StoreIcon /> ASSET STORE  <Link to="/asset/0" style={{ color: 'inherit', textDecoration: 'inherit' }}><StyledButton1 variant="contained" style={{backgroundColor:"#1976d2", color:"white"}} size="small">IP DEVICES</StyledButton1></Link> <Link to="/asset/1" style={{ color: 'inherit', textDecoration: 'inherit' }}><StyledButton variant="contained" color="secondary" size="small">Non IP DEVICES</StyledButton></Link></Typography>
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
        </Provider>

    );
  }
}

export default App;
