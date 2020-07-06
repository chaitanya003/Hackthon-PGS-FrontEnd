import React from 'react';
import Donut from './surveyDonut';
import PastSurvey from './pastSurvey';
import {Grid, Typography} from '@material-ui/core';

class Survey extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:null,
            loading:true,
        }
    }

    componentDidMount(){
        let response = {assets:[{
            assetId: "PA123",
            assetName: "Laptop",
            survey:[{
                surveyStartDate: "31-March-2020",
                surveySurveyDate: "10-April-2020",
                totalNumberOfAssets: 1500,
                totalNumberOfResponse: 1350,
                percentageOfResponse: 90,	
                totalNumberOfNonResponse: 150,	
                percentageOfNonResponse: 10
                },{
                surveyStartDate: "30-Sept-2019",
                surveySurveyDate: "10-Oct-2019",
                totalNumberOfAssets: 1200,
                totalNumberOfResponse: 900,
                percentageOfResponse: 75,	
                totalNumberOfNonResponse: 300,	
                percentageOfNonResponse: 25
                },{
                surveyStartDate: "31-March-2019",
                surveySurveyDate: "10-Apr-2019",
                totalNumberOfAssets: 1300,
                totalNumberOfResponse: 1060,
                percentageOfResponse: 81,	
                totalNumberOfNonResponse: 240,	
                percentageOfNonResponse: 19
                },{
                surveyStartDate: "30-Sept-2018",
                surveySurveyDate: "10-Oct-2018",
                totalNumberOfAssets: 1200,
                totalNumberOfResponse: 1001,
                percentageOfResponse: 83,	
                totalNumberOfNonResponse: 199,	
                percentageOfNonResponse: 17
                }]
        
            }]
        }
        let Donutarr = [{name:"Responded", value:response.assets[0].survey[0].totalNumberOfResponse, col:"#6F6"},
                   {name:"Not responded", value:response.assets[0].survey[0].totalNumberOfNonResponse, col:"#F66"}]
        let Pastarr = [response.assets[0].survey.slice(1,4)]
        this.setState({
            donutData:Donutarr,
            pastData:Pastarr,
            loading:false,
        })
    }

    render(){
        if (this.state.loading === true) {
            return <h1>Loading...</h1>;
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