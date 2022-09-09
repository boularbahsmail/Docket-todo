import { createContext, useState } from "react"
import TaskItem from "../components/TaskItem"
import {ContextProps} from "./ProjectContext"

interface ListContextDatas{
    todoList: JSX.Element[];
    addTodoItem: (item: JSX.Element[]) => void;
    doneList: JSX.Element[];
    addDoneItem: (item: JSX.Element[]) => void;
    moveItem: (key: string, done: boolean) => void;
    removeItem: (key: string, done: boolean) => void;
}

export const ListContext = createContext({} as ListContextDatas)

export default function ListProvider( {children} : ContextProps){

    /** task items states */
    const [todoList, addTodoItem] = useState([<></>])
    const [doneList, addDoneItem] = useState([<></>])

    /**
     * @description move the item when is clicked on the marker button
    */
    const moveItem = (key: string, done: boolean) => {
        const from = done ? doneList : todoList
        let   to   = done ? todoList : doneList
        const item = from.find( (item: any) => item.key === key)

        if( item !== undefined){
            const index   = from.indexOf(item)
            let   removed =  from.splice(index,1)//after.shift()
            let   merged  =  from.concat([])//before.concat(after)

            done ? addDoneItem(merged) : addTodoItem(merged)

            let removedTask = removed[0]?.props.task
            if(removedTask !== undefined){
                removedTask.done = !removedTask.done
                const newList = to.concat([<TaskItem task={removedTask} key={removedTask.id}/>])
                done ? addTodoItem(newList): addDoneItem(newList)
            }
        }
    }

    const removeItem = (key:string, done:boolean) =>{
        const origin = done ? doneList : todoList
        const item   = origin.find( (item: any) => item.key === key)
        if( item !== undefined){
            const index = origin.indexOf(item)
            origin.splice(index,1)
            const merged = origin.concat([])
            done ? addDoneItem(merged) : addTodoItem(merged)
        }
    }

    return(
        <ListContext.Provider value={{
            todoList,
            addTodoItem,
            doneList,
            addDoneItem,
            moveItem,
            removeItem
        }}>
            {children}
        </ListContext.Provider>
    )
}