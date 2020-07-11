const initialDataReducer = (state = [], action) => {

    switch (action.type) {
        case 'Initial': {
            return action.payload;
        }

        default:
            return state;
    }
}

export default initialDataReducer;