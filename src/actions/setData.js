import React from "react";

const setData=(props)=>{

    return{

        type:"setData",
        payload:props.payload
    }

}

export default setData;