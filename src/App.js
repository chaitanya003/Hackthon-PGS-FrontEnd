import React from 'react';
import { Button, Grid, Card, CardContent, Typography } from '@material-ui/core'
import BarChartIcon from '@material-ui/icons/BarChart';
import StoreIcon from '@material-ui/icons/Store';
import FeedbackIcon from '@material-ui/icons/Feedback';
import RateReviewIcon from '@material-ui/icons/RateReview';
import Navbar from './components/navbar'
import Allocation from './components/dashboard/allocationPie'
import Survey from './components/dashboard/surveyGraphs';
import { Link } from 'react-router-dom'
import {createStore} from "redux";
import {Provider} from "react-redux";
import allReducers from "./reducers";
import FaultGraph from "./Graph";
class App extends React.Component {

  render() {

    const store=createStore(allReducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
    return (
      <div style={{ backgroundColor: "#e1f5fe" }}>
          <Navbar />
          <Grid container style={{ marginTop: "30px" }} spacing={2}>
            <Grid item xs={8} container direction="column" spacing={2}>
              <Grid item >
                <Card variant="outlined" >
                  <CardContent>
                    <Typography variant="h4"><BarChartIcon /> Allocation </Typography>
                    <Allocation />
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
                    <Typography variant="h6"><StoreIcon /> Asset Store  <Link to="/asset/0" style={{ color: 'inherit', textDecoration: 'inherit' }}><Button variant="contained" color="primary" size="small">IP Devices</Button></Link> <Link to="/asset/1" style={{ color: 'inherit', textDecoration: 'inherit' }}><Button variant="contained" color="secondary" size="small">Non IP Devices</Button></Link></Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Card variant="outlined">
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
