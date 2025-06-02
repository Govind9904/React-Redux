
import { composeWithDevTools } from '@redux-devtools/extension';

import {createStore , applyMiddleware} from 'redux'
import {thunk } from 'redux-thunk'

const ADD_TASK = 'task/add'
const DELETE_TASK = 'task/delete'
const FETCH_TASK ='task/fetch'


const initialState = {
    task:[],
}

// Create a Reduce functon using a Reducer 
 
const taskReducer =(state =initialState,action)=>{
    switch (action.type) {
        case ADD_TASK:
            return{
                ...state,
                task:[...state.task,action.payload],
            };

        case DELETE_TASK:
            const updatedTask = state.task.filter((currEle,index)=>{
                return index !== action.payload;
            });
            return{
                ...state,
                task:updatedTask

            }
        case FETCH_TASK:
            return{
                ...state,
                task:[...state.task,...action.payload]

            }
    
        default:
            return state;
    }
};

//  Step - 5 :- create create a Action Creators
export const AddTask =(data) =>{
    return {type : ADD_TASK,payload : data}
}


export const deleteTask = (id)=>{
    return {type : DELETE_TASK,payload:id}
}



export const fetchTask= () =>{
    return async(dispatch)=>{
         try {
            const res= await fetch("https://jsonplaceholder.typicode.com/todos?_limit=3");
           const task = await res.json();
           dispatch({type : FETCH_TASK,payload:task.map((cuTask)=> cuTask.title)})


          
       
            
         } catch (error) {
             console.log(error)
         }
}
}



/////////////////////////////////////////


//  Create A Store usinr Reducer

export const Store = createStore(taskReducer,composeWithDevTools(applyMiddleware(thunk)));
console.log(Store)


// Store.dispatch(edittask("thid  is the way"))

// Store.dispatch(AddTask("Gry the data 0"))
// Store.dispatch(AddTask("Gry the data 1"))
// Store.dispatch(AddTask("Gry the data 2"))
// Store.dispatch(AddTask("Gry the data 3"))







// 



