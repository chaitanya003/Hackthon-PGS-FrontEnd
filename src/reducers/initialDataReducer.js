const initialDataReducer=(state=[],action)=> {
    // initialDataReducer.i=0;
    switch (action.type) {
        case 'Initial': {
            if (state.length === 0) {
                // console.log("inside zero");
                return ([{
                    label:action.payload.label,
                    unitsAllocated: action.payload.unitsAllocated,
                    faultyUnits: action.payload.faultyUnits
                }])
            } else {
                // console.log("inside length");
                return ([
                    ...state,
                    {
                        label:action.payload.label,
                        unitsAllocated: action.payload.unitsAllocated,
                        faultyUnits: action.payload.faultyUnits
                    }
                ]);
            }
        }

        case 'After':{
            if(initialDataReducer.i===undefined || initialDataReducer.i===6 || initialDataReducer===12) {
                state = [];
                initialDataReducer.i=0;
            }
            else
                initialDataReducer.i++;

            if (state.length === 0) {
                return ([{
                    label:action.payload.label,
                    unitsAllocated: action.payload.unitsAllocated,
                    faultyUnits: action.payload.faultyUnits
                }])
            } else {
                return ([
                    ...state,
                    {
                        label:action.payload.label,
                        unitsAllocated: action.payload.unitsAllocated,
                        faultyUnits: action.payload.faultyUnits
                    }
                ]);
            }

        }

        default:
            return state;

    }
}

export default initialDataReducer;