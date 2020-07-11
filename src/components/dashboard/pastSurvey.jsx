import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { Paper, Typography, Switch } from "@material-ui/core";
import { withRouter } from "react-router-dom";
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <Paper style={{ width: "200px", height: "85px" }} elevation={5} >
        <center><Typography>{label}</Typography></center>
        <><Typography style={{ marginLeft: "35px", color: "#55bccd" }}>{`responded : ${payload[0].value}%`}</Typography>
          <Typography style={{ marginLeft: "35px", color: "#60d5a8" }}>{`not responded : ${payload[1].value}%`}</Typography>
        </>
      </Paper>
    );
  }
  return null;
};

class PastSurvey extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: props.value,
      checked: true,
    }
  }


  handleClick = (data) => {
    if (data) {
      let url = "/survey/" + data.activePayload[0].payload.surveyId + "/" + data.activePayload[0].payload.surveyStartDate
      this.props.history.push(url)
    }
  };

  handleChange = (event) => {
    this.setState({
      checked: event.target.checked,
    })
  };

  render() {
    if (this.state.checked) {
      return (<>
        <Typography variant="subtitle1" style={{ float: "left" }}>Percentage Wise Distribution</Typography>
        <Switch
          style={{ float: "left", color: "#1976d2" }}
          checked={this.state.checked}
          onChange={this.handleChange}
          color="primary"
          name="checked"
          inputProps={{ 'aria-label': 'primary checkbox' }}
        />
        <center>
          <BarChart
            width={420}
            height={380}
            data={this.state.data}
            layout="vertical"
            margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
            onClick={this.handleClick}
          >
            <XAxis type="number" height={50} />
            <YAxis type="category" dataKey="surveyEndDate" label={{ value: "Past Surveys", position: "top" }} tick={{ fontSize: "10px", fill: "#111" }} />
            <Legend verticalAlign="bottom" layout="vertical" />
            <Tooltip position={{ y: -80 }} content={<CustomTooltip />} />
            <Bar dataKey="percentageOfResponse" stackId="a" fill="#207a87" barSize={30} />
            <Bar dataKey="percentageOfNonResponse" stackId="a" fill="#60d5a8" barSize={30} />
          </BarChart>
        </center>
      </>
      )
    }
    else {
      return (
        <>
          <Typography variant="subtitle1" style={{ float: "left" }}>Percentage Wise Distribution</Typography>
          <Switch
            checked={this.state.checked}
            onChange={this.handleChange}
            color="primary"
            name="checked"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <center>
            <BarChart
              width={420}
              height={380}
              data={this.state.data}
              layout="vertical"
              margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
              onClick={this.handleClick}
            >
              <XAxis type="number" height={50} />
              <YAxis type="category" dataKey="surveyStartDate" label={{ value: "Past Surveys", position: "top" }} tick={{ fontSize: "10px", fill: "#111" }} />
              <Legend verticalAlign="bottom" layout="vertical" />
              <Tooltip position={{ y: -80 }} />
              <Bar dataKey="totalNumberOfResponse" stackId="a" fill="#207a87" barSize={30} />
              <Bar dataKey="totalNumberOfNonResponse" stackId="a" fill="#60d5a8" barSize={30} />
            </BarChart>
          </center>
        </>

      )
    }

  }
}
export default withRouter(PastSurvey)             