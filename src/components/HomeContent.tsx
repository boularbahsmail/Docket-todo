import { useContext } from 'react'
import { ListContext } from '../contexts/TaskContext'
import styles from '../styles/components/Content.module.css'
import TodoList from './TaskListTodo'
import DoneList from './TaskListDone'
import NewTaskInput from './TaskInput'

export default function Content(){

    const {todoList, doneList} = useContext(ListContext)
    
    const Empty = () => <p className={styles.contentEmpty}>Let`s get some work done</p>

    return(
        <main className={`${styles.content} centerContainer`}>
            <header className={styles.contentHeader}>
                <NewTaskInput/>
            </header>
            { (todoList.length === 0 && doneList.length === 0) && <Empty/>}
            <TodoList/>
            <DoneList/>
        </main>
    )
}
