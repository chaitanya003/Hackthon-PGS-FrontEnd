import React, { Component } from 'react';
import { BarChart, Bar,  XAxis, YAxis, Tooltip, Legend} from 'recharts';
import "./pastSurvey.css";
import {Paper, Typography} from "@material-ui/core";
import {withRouter} from "react-router-dom";
const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <Paper style={{width:"200px", height:"85px"}} elevation={5} >
        <Typography>{label}</Typography>
        <div ><div className="box purple"></div><Typography >{`survey taken : ${payload[0].value}%`}</Typography></div>
        <div><div className="box red"></div><Typography >{`survey not taken : ${payload[1].value}%`}</Typography></div>
      </Paper>
    );
  }
  return null;
};

class PastSurvey extends Component {

  constructor(props){
        super(props)
        this.state = {
                data:null,
        }
  }

  componentDidMount(){
    let response =  [{"name":"survey_1", "survey_taken" : 90, "total" :  100},
                      {"name":"survey_2","survey_taken" : 80, "total" :  110},
                      {"name":"survey_3","survey_taken" : 70, "total" :  90}]
    let percent = response.map((res) => {
      let survey_taken_perc = (res.survey_taken * res.total)/100
      let survey_not_taken_perc = 100 - survey_taken_perc
      return {"name":res.name, "survey_taken" : survey_taken_perc, "survey_not_taken" : survey_not_taken_perc }
    })
    this.setState({
      data:percent,
    })   
  }

  handleClick = (data, index) => {
    this.props.history.push("./survey")
  };
        
render() {
    return (
        <center>
        <BarChart
                width={400}
                height={300}
                data={this.state.data}
                layout="vertical"
                margin={{ top: 30, right: 30, left: 30, bottom: 30 }}
                onClick={this.handleClick}
        >
        <XAxis type="number" height={50} />
        <YAxis type="category" dataKey="name"   label={{value:"Past Surveys", position:"top" }} tick = {{fontSize:"10px", fill:"#111"}}/>
        <Legend verticalAlign="bottom"/>
        <Tooltip position={{ y: -80 }} content={<CustomTooltip />}/>  />
        <Bar dataKey="survey_taken" stackId="a" fill="#8884d8" />
        <Bar dataKey="survey_not_taken" stackId="a" fill="#F66" />
        </BarChart>
        </center>
    );
  }
}
export default withRouter(PastSurvey)             