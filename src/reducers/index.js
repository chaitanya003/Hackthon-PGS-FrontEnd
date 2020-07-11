import {combineReducers} from "redux";
import tagReducer from "./tagReducer";
import initialDataReducer from "./initialDataReducer";
import setDataReducer from "./setDataReducer";

const allReducers = combineReducers({
    tagReducer,
    initialDataReducer,
    setDataReducer
})

export default allReducers;