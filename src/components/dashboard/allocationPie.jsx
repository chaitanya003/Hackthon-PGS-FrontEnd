import React, { Component } from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, } from 'recharts';
import { LinearProgress } from '@material-ui/core';
import axios from 'axios';

const COLORS1 = ['#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4'];
const COLORS2 = ['#fff3e0', '#ffe0b2', '#ffcc80', '#ffb74d', '#ffa726', '#ff9800'];

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
			data: '',
			subdata: '',
			loading: true,
		};

	};

	componentDidMount() {
		this.request()

	}

	request = (buId) => {
		let apiUrl
		if (buId) {
			apiUrl = '/asset/allocation/bu?bu_id=' + buId;
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
			apiUrl = '/asset/allocation';
			axios.get(apiUrl)
				.then((response) => {
					let data = []
					for (let i in response.data.assets[0].allocation) {
						let item = {}
						item.id = response.data.assets[0].allocation[i].buId
						item.name = response.data.assets[0].allocation[i].buName
						item.value = response.data.assets[0].allocation[i].unitsAllocation
						data.push(item)
					}
					this.setState({
						data: data,
						subdata: data,
						loading: false,
					})
				})
				.catch((err) => {
					console.log("Error")
				})

		}
	}

	onChangeSector(ID) {
		this.request(ID)
	};

	render() {
		if (this.state.loading === true) {
			return <LinearProgress color="secondary" />;
		}
		return (
			<div style={{ display: "flex", flexDirection: "row" }}>
				<PieChart width={400} height={400}>
					<Pie
						data={this.state.data}
						cx={150}
						cy={150}
						labelLine={false}
						label={renderCustomizedLabel}
						outerRadius={100}
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
					<Legend layout="horizontal" align='left' verticalAlign="bottom" wrapperStyle={{ fontSize: "10px" }} />
				</PieChart>
				<PieChart width={400} height={400}>
					<Pie
						data={this.state.subdata}
						cx={150}
						cy={150}
						labelLine={false}
						label={renderCustomizedLabel}
						outerRadius={100}
						fill="#8884d8"
						dataKey="value"
					>
						{
							this.state.subdata.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS2[index % COLORS2.length]} />)
						}
					</Pie>
					<Tooltip />
					<Legend layout="horizontal" align='right' verticalAlign="bottom" wrapperStyle={{ fontSize: "10px" }} />
				</PieChart>
			</div>

		);
	}
}

