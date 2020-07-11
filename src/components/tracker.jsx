import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import GroupAddIcon from '@material-ui/icons/GroupAdd';
import DoneIcon from '@material-ui/icons/Done';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import GetAppIcon from '@material-ui/icons/GetApp';
import Card from "@material-ui/core/Card";
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import StepConnector from '@material-ui/core/StepConnector';
import Button from '@material-ui/core/Button';
import Navbar from './navbar';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import ErrorIcon from '@material-ui/icons/Error';


const data = new Map([["64", 3], ["65", 5], ["66", 7], ["67", 6], ["68", 5], ["69", 3], ["70", 4], ["71", 3], ["72", 5]]);

const StyledButton = withStyles({
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
    label: {
        textTransform: 'capitalize',
    },
})(Button);


const ColorlibConnector = withStyles({
    alternativeLabel: {
        top: 22,
    },
    active: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    completed: {
        '& $line': {
            backgroundImage:
                'linear-gradient( 95deg,rgb(242,113,33) 0%,rgb(233,64,87) 50%,rgb(138,35,135) 100%)',
        },
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: '#eaeaf0',
        borderRadius: 1,
    },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
    root: {
        backgroundColor: '#ccc',
        zIndex: 1,
        color: '#fff',
        width: 50,
        height: 50,
        display: 'flex',
        borderRadius: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    active: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    },
    completed: {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    },
});

function ColorlibStepIcon(props) {
    const classes = useColorlibStepIconStyles();
    const { active, completed } = props;

    const icons = {
        1: <AttachMoneyIcon />,
        2: <GroupAddIcon />,
        3: < DoneIcon />,
        4: <GetAppIcon />,
        5: <MotorcycleIcon />,
        6: <AccountCircleIcon />,
        7: <ErrorIcon />,
        8: <AccountCircleIcon />
    };

    return (
        <div
            className={clsx(classes.root, {
                [classes.active]: active,
                [classes.completed]: completed,
            })}
        >
            {icons[String(props.icon)]}
        </div>
    );
}

ColorlibStepIcon.propTypes = {
    active: PropTypes.bool,
    completed: PropTypes.bool,
    icon: PropTypes.node,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));

function getSteps() {
    return ['Finance Approval', 'Sourcing Approval', 'Order Placed', 'Delivery', ' Ready to be Allocated', 'Allocated', 'Fault Occured', 'Reassigned'];
}

export default function CustomizedSteppers() {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(2);
    const steps = getSteps();
    let textValue = ''


    const handleDummy = () => {
        let newValue = data.get(textValue)
        if (newValue === 1) {
            handleDummy1();
        }
        if (newValue === 2) {
            handleDummy2();
        }
        if (newValue === 3) {
            handleDummy3();
        }
        if (newValue === 4) {
            handleDummy4();
        }
        if (newValue === 5) {
            handleDummy5();
        }
        if (newValue === 6) {
            handleDummy6();
        }
        if (newValue === 7) {
            handleDummy7();
        }
        if (newValue === 8) {
            handleDummy8();
        }
    };


    const handleDummy1 = () => {
        setActiveStep(1);
    };

    const handleDummy2 = () => {
        setActiveStep(2);
    };

    const handleDummy3 = () => {
        setActiveStep(3);
    };

    const handleDummy4 = () => {
        setActiveStep(4);
    };

    const handleDummy5 = () => {
        setActiveStep(5);
    };

    const handleDummy6 = () => {
        setActiveStep(6);
    };

    const handleDummy7 = () => {
        setActiveStep(7);
    };

    const handleDummy8 = () => {
        setActiveStep(8);
    };


    const onChange = (event) => {
        textValue = event.target.value
    };

    return (
        <div className={classes.root} style={{ backgroundColor: "#eeeeee" }}>
            <Navbar />
            <Card style={{ margin: "70px" }} elevation={10}>
                <Card alignItems="right" style={{ margin: 1 }}>
                    <TextField size="medium" id="standard-basic" label="Asset id" onChange={onChange} style={{ margin: 4 }} />
                    <StyledButton
                        variant="contained"
                        color="secondary"
                        className={classes.button}
                        startIcon={<SearchIcon />}
                        onClick={handleDummy}
                    >
                        Search
      </StyledButton>
                </Card>
                <Stepper alternativeLabel activeStep={activeStep} connector={<ColorlibConnector />}>
                    {steps.map((label) => (
                        <Step key={label}>
                            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
            </Card>
        </div>
    );
}
