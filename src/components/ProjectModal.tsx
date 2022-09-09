import { useContext, useEffect, useState } from 'react'
import Project from '../models/Project'
import styles from '../styles/components/ProjectModal.module.css'
import ProjectItem from './ProjectItem'
import { motion } from "framer-motion"
import { NotificationContext } from '../contexts/NotificationContext'
import { ProjectContext } from '../contexts/ProjectContext'

interface ProjectModalProps{
    closeModal: () => void;
}
export default function ProjectModal( { closeModal } : ProjectModalProps){
    
    /** Project row placeholder component */
    const {addNotification} = useContext(NotificationContext)

    /** input controls */
    const [inputClass, setClass] = useState('')
    const toggleInput = () => inputClass === '' ? setClass('show') : setClass('')
    const [exceptionClass, setException] = useState('')

    /** project list controls */
    const {projectItems, saveProjectList} = useContext(ProjectContext)
    let items: any = []

    /** New project item*/
    function renderNewProject(name: string, id: string){
        let newList: any = projectItems.concat(<ProjectItem name={name} id={id} closeModal={closeModal} key={id}/>)
        saveProjectList(newList)
    }

    /** Project already exist */
    function showExistException(){
        setException('show')
        setTimeout( ()=>{ setException('') }, 3000);
    }

    /** Try to create a new project if not exist */
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const name = e.target[0].value
        new Project().createNew(
            name, 
            (msg, project) => {
                renderNewProject(project.name, project.id)
                addNotification("New project added")
                e.target[0].value = ""
            },
            exist  => showExistException()
        )
    }

    /** initialize list when the comp is mounted */
    const loadProjectList = async () =>{
        try {
            const pj = new Project()
            const collection = await pj.findAll()
            items = collection.projects.map( 
                project => <ProjectItem name={project.name} id={project.id} closeModal={closeModal} key={project.id}/>
            )
            saveProjectList(items)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect( ()=>{ loadProjectList() }, [])

    /** New project input component */
    const ProjectInput = () =>(
        <form onSubmit={handleSubmit} className={`${inputClass} ${styles.newProject}`}>
            <input type="text" className="textfield" placeholder="New project"/>
            <img className={`${styles.inputClose} ${inputClass} mobileOnly`} onClick={toggleInput} src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/close-input-mobile_7UMBDdE2P.svg?updatedAt=1636068868329" />
            <span className={`alreadyExist ${exceptionClass}`}>já existe</span>
        </form>
    )

    return(
        <motion.section 
            initial={{ opacity: 0 }}
            animate={{ opacity:1 }}
            transition={{ duration:0.25 }}
            className={styles.modal}
        >
            <div className={styles.modalMiddleLayer} onClick={closeModal}></div>
            <motion.div 
                initial={{scale:0}}
                animate={{scale:1}}
                className={styles.modalContent}
            >
                <header>
                    <h2>Projects</h2>
                    <ProjectInput/>
                    <button className={`actionButton mobileOnly`} onClick={toggleInput}>
                        new project
                    </button>
                    <img className={`${styles.backIcon} mobileOnly`} onClick={closeModal} src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/close-modal_Y0jJs9a6RX.svg?updatedAt=1636071078963"/>
                </header>
                <div className={styles.projectList}>
                    { projectItems }
                </div>
            </motion.div>
        </motion.section>
    )
}