import {combineReducers} from "redux";
import tagReducer from "./tagReducer";
import initialDataReducer from "./initialDataReducer";
import setPageReducer from "./setPageReducer";
import setDataReducer from "./setDataReducer";

const allReducers = combineReducers({
    tagReducer,
    initialDataReducer,
    setPageReducer,
    setDataReducer
})

export default allReducers;