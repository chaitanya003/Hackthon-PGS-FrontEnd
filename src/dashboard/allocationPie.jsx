import React, { Component } from 'react';
import { PieChart, Pie, Sector, Cell, Legend, ResponsiveContainer } from 'recharts';
import { Button, Grid, Card, CardContent, Typography, Divider } from '@material-ui/core';
import HSBar from "react-horizontal-stacked-bar-chart";
import axios from 'axios';
let dummyData = {
	"assetAllocation": {
		"responseData": {
			"allocationDetails": [
				{
					"name": "Computer Department",
					"assetAllotted": 400
				},
				{
					"name": "Electronics Department",
					"assetAllotted": 200
				},
				{
					"name": "Production Department",
					"assetAllotted": 300
				}
			],
			"totalAssets": 200
		},
		"responseStatus": "OK",
		"responseMessage": ""
	},
	"buAssetAllocation1": {
		"responseData": {
			"allocationDetails": [
				{
					"name": "Sub BU 1",
					"assetAllotted": 13
				},
				{
					"name": "Sub BU 2",
					"assetAllotted": 5
				},
				{
					"name": "Sub BU 3",
					"assetAllotted": 7
				},
				{
					"name": "Sub BU 4",
					"assetAllotted": 8
				},
				{
					"name": "Sub BU 5",
					"assetAllotted": 9
				},
				{
					"name": "Sub BU 6",
					"assetAllotted": 7
				}
			],
			"totalAssets": 50
		},
		"responseStatus": "OK",
		"responseMessage": ""
	},
	"buAssetAllocation2": {
		"responseData": {
			"allocationDetails": [
				{
					"name": "Sub BU 1",
					"assetAllotted": 13
				},
				{
					"name": "Sub BU 2",
					"assetAllotted": 5
				},
				{
					"name": "Sub BU 3",
					"assetAllotted": 17
				}
			],
			"totalAssets": 50
		},
		"responseStatus": "OK",
		"responseMessage": ""
	},
	"buAssetAllocation3": {
		"responseData": {
			"allocationDetails": [
				{
					"name": "Sub BU 1",
					"assetAllotted": 13
				},
				{
					"name": "Sub BU 2",
					"assetAllotted": 15
				},
				{
					"name": "Sub BU 3",
					"assetAllotted": 7
				}
			],
			"totalAssets": 50
		},
		"responseStatus": "OK",
		"responseMessage": ""
	}
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#004051', '#00325F'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};

export default class allocationPie extends Component {
	constructor(props) {
		super(props);
		this.onChangeBar = this.onChangeBar.bind(this);
		this.state = {
			data: ''
		};

	};

	componentWillMount() {
		let response = this.request()
		this.setState({
			data: response,
		});
	}

	request = (buName) => {
		let apiUrl
		let response
		if (buName) {
			apiUrl = ' /asset/allocation?bu=buName';
			response = axios.get(apiUrl);
			// if (buName === 'Computer Department') {
			// 	response = dummyData['buAssetAllocation1']
			// }
			// if (buName === 'Electronics Department') {
			// 	response = dummyData['buAssetAllocation2']
			// }
			// if (buName === 'Production Department') {
			// 	response = dummyData['buAssetAllocation3']
			// }
		} else {
			apiUrl = '/asset/allocation';
			response = axios.get(apiUrl);
			//response = dummyData['assetAllocation']
		}
		let data = []
		for (let i in response.responseData.allocationDetails) {
			let item = {}
			item.name = response.responseData.allocationDetails[i].name
			item.value = response.responseData.allocationDetails[i].assetAllotted
			data.push(item)
		}
		return data
	}

	onChangeBar(data) {

		let response = this.request(data)

		this.setState({
			data: response,
		});
	};

	render() {
		return (
			<div>

				{/* <HSBar
					showTextDown
					outlineWidth= {0.5}
					id="hsbarExample"
					data={this.request()}
					cx={200}
					cy={200}
					onClick={e => {
						// this.setState(state => ({
						// 	...state,
						// 	value: e.bar.value
						// }))
						this.onChangeBar(e.bar.name);
					}
					}
				/> */}
				<PieChart width={800} height={400}>
					
					<Pie
						data={this.request()}
						cx={350}
						cy={200}
						labelLine={false}
						label={renderCustomizedLabel}
						outerRadius={100}
						fill="#8884d8"
						dataKey="value"
						onClick={e => {
							// this.setState(state => ({
							// 	...state,
							// 	value: e.bar.value
							// }))
							this.onChangeBar(e.name);
						}
						}
					>
						{
							this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
						}

					</Pie>
					<Legend align='left' verticalAlign="top"/>

					<Pie
						data={this.state.data}
						cx={650}
						cy={200}
						labelLine={false}
						label={renderCustomizedLabel}
						outerRadius={100}
						fill="#8884d8"
						dataKey="value"
					>
						{
							this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
						}
					</Pie>
					<Legend align='right' verticalAlign="bottom"/>
			
				</PieChart>
			</div>

		);
	}
}

