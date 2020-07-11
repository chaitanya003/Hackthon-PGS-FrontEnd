import React from 'react';
import Donut from './surveyDonut';
import PastSurvey from './pastSurvey';
import { Grid, Typography, LinearProgress } from '@material-ui/core';
import axios from 'axios';
import RateReviewIcon from '@material-ui/icons/RateReview';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';

class Survey extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSurveyID: null,
            currentSurveyDate: null,
            data: null,
            loading: true,
        }
    }

    componentDidMount() {

        axios.get('http://pgshackathon-env.eba-smftmkmh.us-east-2.elasticbeanstalk.com/asset/allocation/survey')
            .then((res) => {
                let Donut = {
                    overall: [{ name: "Responded", value: res.data[3].totalNumberOfResponse, col: "#207a87" },
                    { name: "Not responded", value: res.data[3].totalNumberOfNonResponse, col: "#60d5a8" }],
                    responsetype: [{ name: "+ve Response", value: res.data[3].totalNumberOfPositiveResponses, col: "#207a87" },
                    { name: "-ve Response", value: res.data[3].totalNumberOfNegativeResponses, col: "#60d5a8" }]
                }
                let Pastarr = res.data.slice(0, 3).reverse()
                this.setState({
                    currentSurveyID: res.data[3].surveyId,
                    currentSurveyDate: res.data[3].surveyStartDate,
                    donutData: Donut,
                    pastData: Pastarr,
                    loading: false,
                })
            })
            .catch((err) => {
                console.log("Error")
            })
    }

    render() {
        if (this.state.loading === true) {
            return <LinearProgress color="secondary" />;
        }
        return (
            <>
                <div>
                    <Typography variant="h6"><RateReviewIcon /> CURRENT SURVEY STATUS</Typography>
                    <Donut value={this.state.donutData} Id={this.state.currentSurveyID} date={this.state.currentSurveyDate} />
                </div>
                <div>
                    <Typography variant="h6"><ThumbsUpDownIcon /> PAST SURVEY'S TURNOUT</Typography>
                    <PastSurvey value={this.state.pastData} />
                </div>
            </>
        )
    }
}
export default Survey;
