import React, { Component } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

const data = [
    { name: 'survey_1',completed: 400, notCompleted: 100 },
    { name: 'survey_2',completed: 300, notCompleted: 150 },
    { name: 'survey_3',completed: 200, notCompleted: 170 },
  ];
class ContentFlow extends Component {

//   constructor(props){
//         super(props)
//         this.state = {
//                 data:{
//                     "Yes": 100,
//                 },
//                 loading:true,
//         }

//         }
        
render() {
    return (
        <center>
        <BarChart
                width={450}
                height={300}
                data={data}
                layout="vertical"
                margin={{ top: 30, right: 30, left: 30, bottom: 10 }}
        >
        <Tooltip position={{ y: -100 }} />
        <XAxis type="number" label={{position:"insideBottomRight"}} />
        <YAxis type="category" dataKey="name"   label={{value:"Past Surveys", position:"top" }} tick = {{fontSize:"10px", fill:"#111"}}/>
        <Tooltip />
        <Legend />
        <Bar dataKey="completed" stackId="a" fill="#8884d8" />
        <Bar dataKey="notCompleted" stackId="a" fill="#82ca9d" />
        </BarChart>
        </center>
    );
  }
}
export default ContentFlow;
                              