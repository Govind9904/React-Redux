import { useSelector ,useDispatch} from 'react-redux'
import {MdDeleteForever} from 'react-icons/md'
import './Todo.css'
import { useState } from 'react'
import { AddTask, deleteTask, fetchTask, } from '../store'

export const Todo = () => {
    
    const [task,setTask] = useState("")

    const Task = useSelector((state) => state.task)
     console.log("State React" ,Task)
        
     const dispatch = useDispatch();

    //  handle Form submit

    const handleFormSUbmit = (e)=>{
        e.preventDefault();
       dispatch(AddTask(task));
       return setTask("")
       
    }

    


    
    // hande delete task

    const handleTaskDelete = (id) =>{
        return dispatch(deleteTask(id))
        
    }

    const handleFetchTasks = () =>{
        // fetch task from Api
        dispatch(fetchTask());
    }

    
   
  


    

    return (
        <div className="container">
            <div className="todo-app">
                <h1> To-Do List</h1>
                <div className="row">
                    <form onSubmit={handleFormSUbmit}>
                        <input type="text" id="input-box" placeholder="Add New Task" 
                         value={task} onChange={(e)=>setTask(e.target.value)}/>
                        <button>Add Task</button>
                    </form>

                </div>
                <button onClick={handleFetchTasks}>Fetch Task</button>
                <div>
                <ul id="list=container">
                    {
                       Task.map((currTask,index)=>{
                        return <p key={index}>
                            {index + 1}:{currTask}<MdDeleteForever  className='icon-style' onClick ={()=>handleTaskDelete(index)}/></p>

                            })
                    
                        
                

                    }



                </ul>
                </div>
            </div>
        </div>
    )
}