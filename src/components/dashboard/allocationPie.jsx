import React, { Component } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';
import { Typography, Card, CardHeader, CardContent, Divider } from '@material-ui/core';
import axios from 'axios';

const COLORS1 = ['#5893d8', '#53bbc9', '#5fd4a8', '#8ee677', '#dcf483', '#eedc9b', '#0d47a1', '#90caf9'];
const COLORS2 = ['#5893d8', '#53bbc9', '#5fd4a8', '#8ee677', '#dcf483', '#eedc9b', '#0d47a1', '#90caf9'];


const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
	cx, cy, midAngle, innerRadius, outerRadius, percent, index,
}) => {
	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
	const x = cx + radius * Math.cos(-midAngle * RADIAN);
	const y = cy + radius * Math.sin(-midAngle * RADIAN);

	return (
		<text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
			{`${(percent * 100).toFixed(0)}%`}
		</text>
	);
};



export default class allocationPie extends Component {
	constructor(props) {
		super(props);
		this.onChangeSector = this.onChangeSector.bind(this);
		this.state = {
			data: props.value,
			subdata: null,
			loading: true,
		};

	};

	componentDidMount() {
		// this.request()

	}

	request = (buId) => {
		let apiUrl
		if (buId) {
			apiUrl = 'http://pgshackathon-env.eba-smftmkmh.us-east-2.elasticbeanstalk.com/asset/allocation/bu?bu_id=' + buId;
			axios.get(apiUrl)
				.then((response) => {
					console.log(response)
					let data = []
					for (let i in response.data.assets[0].allocation) {
						let item = {}
						item.name = response.data.assets[0].allocation[i].buName
						item.value = response.data.assets[0].allocation[i].unitsAllocation
						data.push(item)
					}
					console.log(data)
					this.setState({
						subdata: data,
					})
				})
				.catch((err) => {
					console.log("Error")
				})
		} else {
			// apiUrl = '/asset/allocation';
			// axios.get(apiUrl)
			// 	.then((response) => {
			// 		let data = []
			// 		for (let i in response.data.assets[0].allocation) {
			// 			let item = {}
			// 			item.id = response.data.assets[0].allocation[i].buId
			// 			item.name = response.data.assets[0].allocation[i].buName
			// 			item.value = response.data.assets[0].allocation[i].unitsAllocation
			// 			data.push(item)
			// 		}
			// 		this.setState({
			// 			data: data,
			// 			subdata: data,
			// 			loading: false,
			// 		})
			// 	})
			// 	.catch((err) => {
			// 		console.log("Error")
			// 	})

		}
	}

	onChangeSector(ID) {
		this.request(ID)
	};

	render() {
		return (
			<div style={{ display: "flex", flexDirection: "row" }}>
				<Card variant="outlined" style={{marginRight:"1%", marginLeft:"1%"}}>
					<CardHeader title="BUSINESS UNIT" titleTypographyProps={{variant:'h6'}} style={{ textAlign: 'center', backgroundColor: '#f5f5f5' }} />
					<Divider />
					<CardContent style={{ backgroundColor: '#fafafa' }}>
						<PieChart width={350} height={350}>
							<Pie
								data={this.state.data}
								cx={40}
								cy={120}
								labelLine={false}
								label={renderCustomizedLabel}
								outerRadius={110}
								fill="#8884d8"
								dataKey="value"
								onClick={e => {
									this.onChangeSector(e.id);
								}
								}
							>
								{
									this.state.data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS1[index % COLORS1.length]} />)
								}

							</Pie>
							<Tooltip />
							<Legend iconType="wye" layout="vertical" align='left' verticalAlign="bottom" wrapperStyle={{ fontSize: "10px" }} />
						</PieChart>
					</CardContent>
				</Card>
				<Card variant="outlined" >
					{
						this.state.subdata === null && <div><CardHeader title="SUB BUSINESS UNIT" titleTypographyProps={{variant:'h6'}} style={{textAlign: 'center', backgroundColor: '#f5f5f5' }} />
							<Divider /><Typography style={{ margin: 100, textAlign: 'center', color: '#1b5e20', fontFamily: 'Lucida Console' }}>Click on the BU to get more insights about it.</Typography></div>
					}
					{this.state.subdata !== null && <div><CardHeader title="SUB BUSINESS UNIT" titleTypographyProps={{variant:'h6'}} style={{  textAlign: 'center', backgroundColor: '#f5f5f5' }} />
						<Divider />
						<CardContent style={{ backgroundColor: '#fafafa' }}>
							<PieChart width={350} height={350}>
								<Pie
									data={this.state.subdata}
									cx={100}
									cy={120}
									labelLine={false}
									label={renderCustomizedLabel}
									outerRadius={110}
									fill="#8884d8"
									dataKey="value"
								>
									{
										this.state.subdata.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />)
									}
								</Pie>
								<Tooltip />
								<Legend iconType="wye" layout="vertical" align='left' verticalAlign="bottom" wrapperStyle={{ fontSize: "10px" }} />
							</PieChart>
						</CardContent>
					</div>
					}


				</Card>
			</div>

		);
	}
}

