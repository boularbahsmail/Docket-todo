/** Project row component */
import { useContext, useState } from 'react'
import { ProjectContext } from '../contexts/ProjectContext'
import styles from '../styles/components/ProjectItem.module.css'
import { constants } from "../models/Constants"
import Delete from './Delete'
import Project from '../models/Project'
import { NotificationContext } from '../contexts/NotificationContext'

interface ItemProps{
    name: string;
    id: string;
    closeModal: () => void;
}

export default function ProjectItem ( {name, id, closeModal} : ItemProps){

    const {
        currentProject,
        changeCurrentProject,
        removeItem
    } = useContext(ProjectContext)

    const {addNotification} = useContext(NotificationContext)

    const markAsSelected = () => {
        if( name !== currentProject ){
            changeCurrentProject(name)
            closeModal()
        }
    }

    const deleteThis = () =>{
        new Project().deleteByName(name)
        currentProject === name && changeCurrentProject(constants.default)
        removeItem(id)
        addNotification("Project removed")
    }

    const[deleteAction, showDelete] = useState(false)
    const toggleDelete = () => showDelete(!deleteAction)

    return(
        <div className={`${styles.projectItem} ${name === currentProject && styles.itemSelected}`}>
            <h3 onClick={ markAsSelected }>
                {name}
            </h3>
            { deleteAction && <Delete deleteAction={deleteThis} cancelAction={toggleDelete}/> }
            {
                name !== constants.default &&
                <img onClick={toggleDelete} src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/drop-project-icon_T7hUGuu4-.svg?updatedAt=1636490857790" />
            }
        </div>
    )
}