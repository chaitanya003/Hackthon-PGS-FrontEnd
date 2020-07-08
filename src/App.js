import React from 'react';
import {Button, Grid, Card, CardContent, Typography} from '@material-ui/core'
import Navbar from './components/navbar'
import Allocation from './components/dashboard/allocationPie'
import Survey from './components/dashboard/surveyGraphs';
import {Link} from 'react-router-dom'
class App extends React.Component {

  render(){
  return (
      <div style={{backgroundColor:"#eee"}}>
      <Navbar/>
      <Grid container style={{marginTop:"30px" }} spacing = {2}>
        <Grid item xs={8} container direction="column" spacing = {2}> 
          <Grid item >
            <Card variant ="outlined" >
              <CardContent>
                <Typography variant = "h4">Allocation</Typography>
                <Allocation/>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card variant ="outlined">
              <CardContent>
                <Typography variant = "h4">Fault Tolerance</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid item xs={4} container direction="column" spacing = {2} >
        <Grid item >
            <Card variant ="outlined">
              <CardContent>
                <Typography variant="h6">Asset Store  <Link to="/asset/1" style={{ color: 'inherit', textDecoration: 'inherit'}}><Button variant="contained" color="primary">IP Devices</Button></Link> <Link to="/asset/2" style={{ color: 'inherit', textDecoration: 'inherit'}}><Button variant="contained" color="secondary">Non IP Devices</Button></Link></Typography>
            </CardContent>
            </Card>
          </Grid>
          <Card variant ="outlined">
            <CardContent>
              <Survey/>
            </CardContent>
          </Card>  
          </Grid>
      </Grid>
      </div>
  );
}
}

export default App;
