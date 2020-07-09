import React from 'react';
import { Button, Grid, Card, CardContent, Typography } from '@material-ui/core'
import BarChartIcon from '@material-ui/icons/BarChart';
import StoreIcon from '@material-ui/icons/Store';
import FeedbackIcon from '@material-ui/icons/Feedback';
import RateReviewIcon from '@material-ui/icons/RateReview';
import AnimatedBg from "react-animated-bg";
import Navbar from './components/navbar'
import Allocation from './components/dashboard/allocationPie'
import Survey from './components/dashboard/surveyGraphs';
import { Link } from 'react-router-dom'
class App extends React.Component {

  render() {
    return (
      <div style={{ backgroundColor: "#eee" }}>
        <AnimatedBg
          colors={["#fafafa", "#f5f5f5", "#eeeeee", "#e0e0e0", "#bdbdbd", "#9e9e9e"]}
          duration={1.5}
          delay={0}
          timingFunction="ease-out"
          className="animated-section"
        >
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
                    <Typography variant="h4">Fault Tolerance</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid item xs={4} container direction="column" spacing={2} >
              <Grid item >
                <Card variant="outlined">
                  <CardContent>
                    <Typography variant="h6"><StoreIcon /> Asset Store  <Link to="/asset/1" style={{ color: 'inherit', textDecoration: 'inherit' }}><Button variant="contained" color="primary">IP Devices</Button></Link> <Link to="/asset/2" style={{ color: 'inherit', textDecoration: 'inherit' }}><Button variant="contained" color="secondary">Non IP Devices</Button></Link></Typography>
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
        </AnimatedBg>
      </div>
    );
  }
}

export default App;
