import React from "react";


const setDataReducer=(state=[],action)=>{
     switch (action.type) {
         case 'setData':
         {
             return action.payload;
         }

         default:
             return state;

     }

}


export default setDataReducer;