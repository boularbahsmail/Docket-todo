import { useContext, useState } from 'react'
import { ListContext } from '../contexts/TaskContext'
import { NotificationContext } from '../contexts/NotificationContext'
import { ProjectContext } from '../contexts/ProjectContext'
import Task from '../models/Task'
import styles from '../styles/components/TaskItem.module.css'
import {motion} from "framer-motion"
import DeleteItem from './Delete'

interface TaskItemProps{
    task: Task;
}

export default function TaskItem({task } : TaskItemProps ){

    const {text, id, done} = task
    const { moveItem, removeItem } = useContext(ListContext)
    const { currentProject } = useContext(ProjectContext)
    const { addNotification } = useContext(NotificationContext)


    const [options, showOptions] = useState(false)
    const toggleOptions = () => showOptions(!options)

    const checkIcon = "https://ik.imagekit.io/lrjseyuxi3m/todoapp/done-icon_6MGPqT2l9I.svg?updatedAt=1636031124073"
    
    const toggleStatus = () => {
        Task.toggleStatus(currentProject, id)
        moveItem(id, done)
        done ? addNotification("Task undone") : addNotification("Task done")
    }

    const deleteThis = () =>{
        Task.deleteById(id)
        removeItem(id,done)
        addNotification("Task removed")
    }

    return(
        <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration:0.25}}
            className={`${styles.taskItem} ${done && styles.taskItemDone}`}
        >
            <button className={styles.taskCheckButton} type="button" onClick={toggleStatus}>
                {done && <img src={checkIcon} alt=""/>}
            </button>
            <p>{text}</p>
            {
                options &&
                    <DeleteItem deleteAction={deleteThis} cancelAction={toggleOptions} />
                ||
                    <img 
                        className={styles.taskDeleteButton}
                        onClick={toggleOptions}
                        src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/drop-task-item_2g-tBVXMHAZ.svg?updatedAt=1636505338272" 
                    />
                    
            }
        </motion.div>
    )
}