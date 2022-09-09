import styles from '../styles/components/Header.module.css'
import { useContext } from 'react'
import { ProjectContext } from '../contexts/ProjectContext'
import Link from "next/link"

interface HeaderProps{
    openProjects: () => void;
}

export default function Header({openProjects}:HeaderProps){

    const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']

    function getCurrentDate(){
        const date = new Date()
        return days[date.getDay()]+', '+months[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear()
    }

    const {currentProject} = useContext(ProjectContext)

    return(
        <header className={styles.head}>
            <div className={`${styles.headContent} centerContainer`}>
                <div className={styles.logoAndProject}>
                    <Link href="/">
                        <a className={styles.logo}>
                            <img src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/todo-app-logo_begPyVFhCQy-.svg?updatedAt=1636031123870" />
                        </a>
                    </Link>
                    <button className={styles.currentProject} onClick={openProjects}>
                        {currentProject}
                        <img src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/project-icon_1RFrQOmw6A.svg?updatedAt=1636031123903" />
                    </button>
                </div>
                <span className={styles.headToday}>
                    { getCurrentDate() }
                </span>
            </div>
        </header>
    )
}