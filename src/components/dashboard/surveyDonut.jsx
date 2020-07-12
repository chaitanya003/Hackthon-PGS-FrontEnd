import React, { Component } from 'react';
import { PieChart, Pie, Sector } from 'recharts';
import { withRouter } from 'react-router-dom';
import { Switch, Typography } from '@material-ui/core';

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value, col
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={col}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#207a87">{`${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#60d5a8">
        {`(${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


class SurveyDonut extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.value.overall,
      responseTypedata: props.value.responsetype,
      activeIndex: 0,
      checked: false,
    }
  }





  onPieEnter = (data, index) => {
    this.setState({
      activeIndex: index,
    });
  };

  handleClick = (data, index) => {
    if (data.name === "Not Responded") {
      let url = "/survey/" + this.props.Id + "/" + this.props.date
      this.props.history.push(url)
    }
    else {
      this.setState({
        checked: true,
      })
    }
  };

  handleChange = (event) => {
    this.setState({
      checked: event.target.checked,
    })
  };


  render() {
    if (this.state.checked === true) {
      return (
        <>
          <Typography variant="subtitle1" style={{ float: "left" }}>Response Type Distribution</Typography>
          <Switch
            style={{ float: "left", color: "#207a87" }}
            checked={this.state.checked}
            onChange={this.handleChange}
            color="primary"
            name="checked"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <center>
            <PieChart width={400} height={400} margin={{ top: 30, right: 30, left: 30, bottom: 30 }} >
              <Pie
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                data={this.state.responseTypedata}
                cx={170}
                cy={150}
                innerRadius={90}
                outerRadius={110}
                fill="#53bbc9"
                dataKey="value"
                onMouseEnter={this.onPieEnter}
              />
            </PieChart>
          </center>
        </>
      )
    }
    else {
      return (
        <>
          <Typography variant="subtitle1" style={{ float: "left" }}>Response Type Distribution</Typography>
          <Switch
            style={{ float: "left", color: "#1976d2" }}
            checked={this.state.checked}
            onChange={this.handleChange}
            color="primary"
            name="checked"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
          <center>
            <PieChart width={400} height={400} margin={{ top: 30, right: 30, left: 30, bottom: 30 }} >
              <Pie
                activeIndex={this.state.activeIndex}
                activeShape={renderActiveShape}
                data={this.state.data}
                cx={170}
                cy={150}
                innerRadius={90}
                outerRadius={110}
                fill="#53bbc9"
                dataKey="value"
                onMouseEnter={this.onPieEnter}
                onClick={this.handleClick}
              />
            </PieChart>
          </center>
        </>
      );
    }
  }
}
export default withRouter(SurveyDonut)