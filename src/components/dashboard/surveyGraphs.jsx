import React from 'react';
import Donut from './surveyDonut';
import PastSurvey from './pastSurvey';
import {Grid, Typography, LinearProgress} from '@material-ui/core';
import axios from 'axios';

class Survey extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:null,
            loading:true,
        }
    }

    componentDidMount(){

        axios.get('/asset/allocation/survey')
            .then((res) =>{
                let Donutarr = [{name:"Responded", value:res.data[3].totalNumberOfResponse, col:"#6F6"},
                   {name:"Not responded", value:res.data[3].totalNumberOfNonResponse, col:"#F66"}]
                let Pastarr = res.data.slice(0,3).reverse()
                this.setState({
                    donutData:Donutarr,
                    pastData:Pastarr,
                    loading:false,
                })
            })
            .catch((err) =>{
                console.log("Error")
            })
    }

    render(){
        if (this.state.loading === true) {
            return <LinearProgress color="secondary"/>;
        }
        return(
            <>
            <Grid item >
                <Typography variant="h4">Current Survey Status</Typography>
                <Donut value = {this.state.donutData}/>
            </Grid>
            <Grid item>
                <Typography variant="h4">Past Surveys Turnout</Typography>
                <PastSurvey  value = {this.state.pastData}/>
            </Grid>
            </>
        )
    }
}
export default Survey;