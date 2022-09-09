import { useContext, useEffect } from "react";
import { ListContext } from "../contexts/TaskContext";
import Project from "../models/Project"
import TaskItem from "./TaskItem"
import Task from "../models/Task"
import { ProjectContext } from "../contexts/ProjectContext";
import TaskList from "./TaskList";


export default function TaskListTodo(){

    const {todoList, addTodoItem} = useContext(ListContext)
    const {currentProject} = useContext(ProjectContext)

    const loadTasksToDo = async () =>{
        const list  = await new Project().tasksToDo()
        const items = list.map( (task: Task) => <TaskItem task={task} key={task.id}/>)
        addTodoItem(items)
    }

    useEffect( () =>{ 
        loadTasksToDo()
    }, [currentProject])

    return(
        <TaskList>
        {
            todoList.length > 0 &&
            <>
                <h3>• To-Do</h3>
                { todoList }
            </>
        }
        </TaskList>
    )
}