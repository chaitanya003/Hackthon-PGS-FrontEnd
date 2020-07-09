import React from "react";

const tagReducer=(state=[],action)=>{
    switch (action.type) {
        case 'Tag':
        {      if(state.length==0)
                 {

                       return [{
                           tag:action.payload,
                           arr:action.arr
                       }]
                  }
                 else
               {

                   return ([
                       ...state,
                        {
                           tag:action.payload,
                           arr:action.arr
                         }
                   ])
               }
        }

        case 'Filter':
        {
            // let newState=[];
            // if(tagReducer.j===undefined) {
            //     let arr = action.arr;
            //     for (let i = 0; i < arr.length; i++) {
            //         state.map((props) => {
            //             if (props === action.payload)
            //                 newState.push(props);
            //         })
            //     }
            //     tagReducer.j=0;
            // }
            state=[];
            let ans=action.arr;
            ans.map((props)=>{
                let obj={tag:props};
                state.push(obj);
            });
            // console.log("State= ",action.arr);
            return state;
        }

        default:
            return state;
    }
}


export default tagReducer;