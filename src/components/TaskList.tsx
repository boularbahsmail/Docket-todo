import { ReactNode } from "react";
import styles from '../styles/components/TaskList.module.css'

export interface Children{
    children: ReactNode;
}

export default function TaskList({ children }:Children){
    return(
        <section className={styles.taskList}>
            {children}
        </section>
    )
}