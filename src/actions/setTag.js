import React from "react";

const setTag=(props)=>{

    return({
        type:props.type,
        payload:props.payload,
        arr:props.arr
    });
}

export default setTag;