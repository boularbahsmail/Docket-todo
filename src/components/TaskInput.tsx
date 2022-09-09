import { useContext, useState } from "react"
import { ListContext } from "../contexts/TaskContext"
import { NotificationContext } from "../contexts/NotificationContext"
import Project from "../models/Project"
import TaskItem from "./TaskItem"
import styles from '../styles/components/Content.module.css'


export default function NewTask(){

    const {todoList, addTodoItem} = useContext(ListContext)
    const {addNotification} = useContext(NotificationContext)

    /** add tasks states */
    const [taskInputClass, setInputClass] = useState('')
    const toggleInput = () => taskInputClass === '' ? setInputClass('show') : setInputClass('')

    /** add task at form submit */
    const handleTaskSubmit = async (e:any) =>{
        e.preventDefault()
        const task = await new Project().addTask(e.target[0].value)
        const newTodoList = todoList.concat([<TaskItem task={task}  key={task.id}/>])
        addTodoItem(newTodoList)
        e.target[0].value = ""
        addNotification("New task added")
    }

    return(
        <>
            <h2>Tasks</h2>
            <form className={`${styles.contentInput} ${taskInputClass}`} onSubmit={handleTaskSubmit}>
                <input type="text" className="textfield" placeholder="Type to add a new task"/>
                <img className="mobileOnly inputMobileClose" onClick={toggleInput} src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/close-input-mobile_7UMBDdE2P.svg?updatedAt=1636068868329" />
            </form>
            <button className="actionButton mobileOnly" onClick={toggleInput}>
                add task
            </button>
        </>
    )
    
}