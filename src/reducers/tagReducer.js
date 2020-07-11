const tagReducer = (state = [], action) => {

    switch (action.type) {
        case 'Tag': {
            if (state.length === 0) {
                return [{
                    tag: action.payload,
                    arr: action.arr
                }]
            } else {
                console.log("inside not present");
                return ([
                    ...state,
                    {
                        tag: action.payload,
                        arr: action.arr
                    }
                ])
            }
        }

        case 'Filter': {

            state = [];
            let ans = action.arr;
            state = ans.map((props) => {
                return {tag: props}
            });
            return state;
        }

        default:
            return state;
    }
}


export default tagReducer;