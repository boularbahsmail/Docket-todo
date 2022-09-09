import { useContext, useEffect } from "react";
import { ListContext } from "../contexts/TaskContext";
import Project from "../models/Project"
import TaskItem from "./TaskItem"
import Task from "../models/Task"
import { ProjectContext } from "../contexts/ProjectContext";
import TaskList from "./TaskList";


export default function TaskListDone(){

    const {doneList, addDoneItem} = useContext(ListContext)
    const {currentProject} = useContext(ProjectContext)

    const loadTasksToDo = async () =>{
        const list  = await new Project().tasksDone()
        const items = list.map( (task: Task) => <TaskItem task={task} key={task.id}/>)
        addDoneItem(items)
    }

    useEffect( () =>{ 
        loadTasksToDo()
    }, [currentProject])

    return(
        <TaskList>{
            doneList.length > 0 &&
            <>
                <h3>• Done</h3>
                { doneList }
            </>
        }</TaskList>
    )
}