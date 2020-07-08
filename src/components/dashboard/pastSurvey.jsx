import React, { Component } from 'react';
import { BarChart, Bar,  XAxis, YAxis, Tooltip, Legend} from 'recharts';
import {Paper, Typography, Switch} from "@material-ui/core";
import {withRouter} from "react-router-dom";
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <Paper style={{width:"200px", height:"85px"}} elevation={5} >
        <center><Typography>{label}</Typography></center>
        <><Typography style={{marginLeft:"35px", color:"#8884d8"}}>{`responded : ${payload[0].value}%`}</Typography>
        <Typography style={{marginLeft:"35px", color:"#F66"}}>{`not responded : ${payload[1].value}%`}</Typography>
        </>
        </Paper>
    );
  }
  return null;
};

class PastSurvey extends Component {

  constructor(props){
        super(props)
        console.log(props.value)
        this.state = {
                data:props.value,
                checked:true,
        }
  }


  handleClick = (data, index) => {
    let url = "/survey/" + data.activePayload[0].payload.surveyId
    this.props.history.push(url)
  };  

  handleChange = (event) => {
    this.setState({
      checked: event.target.checked,
    })
  };
        
render() {
    if(this.state.checked){
      return(<>
              <Typography variant = "subtitle1" style={{float:"left"}}>Percentage Wise Distribution</Typography>
              <Switch
                style={{float:"left"}}
                checked={this.state.checked}
                onChange={this.handleChange}
                color="primary"
                name="checked"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <BarChart
                width={400}
                height={300}
                data={this.state.data}
                layout="vertical"
                margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
                onClick={this.handleClick}
                >
                <XAxis type="number" height={50} />
                <YAxis type="category" dataKey="surveyEndDate"   label={{value:"Past Surveys", position:"top" }} tick = {{fontSize:"10px", fill:"#111"}}/>
                <Legend verticalAlign="bottom"/>
                <Tooltip position={{ y: -80 }} content={<CustomTooltip />}/>  />
                <Bar dataKey="percentageOfResponse" stackId="a" fill="#8884d8" />
                <Bar dataKey="percentageOfNonResponse" stackId="a" fill="#F66" />
                </BarChart>
              </>
              )
    }
    else {
      return(
              <>
              <Typography variant = "subtitle1" style={{float:"left"}}>Percentage Wise Distribution</Typography>
              <Switch
                checked={this.state.checked}
                onChange={this.handleChange}
                color="primary"
                name="checked"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <BarChart
                width={400}
                height={300}
                data={this.state.data}
                layout="vertical"
                margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
                onClick={this.handleClick}
              >
              <XAxis type="number" height={50} />
              <YAxis type="category" dataKey="surveyEndDate"   label={{value:"Past Surveys", position:"top" }} tick = {{fontSize:"10px", fill:"#111"}}/>
              <Legend verticalAlign="bottom"/>
              <Tooltip position={{ y: -80 }}  />
              <Bar dataKey="totalNumberOfResponse" stackId="a" fill="#8884d8" />
              <Bar dataKey="totalNumberOfNonResponse" stackId="a" fill="#F66" />
              </BarChart>
              </>
              )
    }
  
  }
}
export default withRouter(PastSurvey)             