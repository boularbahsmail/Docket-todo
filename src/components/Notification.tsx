import { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'
import styles from '../styles/components/Notification.module.css'
import {motion} from "framer-motion"

interface NotificationProps{
    message: string;
}

export default function Notification({message} : NotificationProps){
    
    const {clearNotification} = useContext(NotificationContext)

    return(
        <motion.div 
            initial={{y:10}}
            animate={{y:-10}}
            className={`${styles.notification}`}
        >
            <p>{message}</p>
            <button onClick={clearNotification}>
                <img src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/close-notification_mlU3tWRiU76.svg?updatedAt=1636397311630" />
            </button>
        </motion.div>
    )
}