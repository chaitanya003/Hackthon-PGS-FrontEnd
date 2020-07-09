import React from "react";


const setPageReducer=(state=true,action)=>{
      switch (action.type) {
          case 'setPage':
          {
              return action.payload;
          }

          default:
              return state;
      }


}


export default setPageReducer;