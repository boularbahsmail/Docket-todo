import {v4 as uuid} from "uuid"
import Project from "./Project"

export default class Task{
    id:   string  = ""
    text: string  = ""
    done: boolean = false
    
    constructor(text: string){
        this.text = text
        this.id = uuid()
        this.done = false
    }

    static toggleStatus(projectName:string, taskId: string){
        const tasks = Project.getTasksFromStorage(projectName)
        let found = tasks.find( (task: Task) => task.id === taskId)
        if(found !== null){
            const index = tasks.indexOf(found)
            found.done = !found.done
            tasks[index] = found
            localStorage.setItem(`tasks[${projectName}]`, JSON.stringify(tasks))
        }
    }

    static async deleteById(taskId: string){
        //tarefas do proj atual
        const project = new Project()
        const tasks = await project.tasksOfCurrent()
        //ecnontrar  a task com id e pegar o index
        const item  = tasks.find( ({id}: Task)  => id === taskId)
        const index = tasks.indexOf(item)
        //dividir o array
        tasks.splice(index, 1)
        //salvar novamente
        localStorage.setItem(`tasks[${project.getCurrentProject()}]`, JSON.stringify(tasks))
    }
    
}