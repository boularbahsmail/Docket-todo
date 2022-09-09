import  {v4 as uuid} from "uuid"
import { constants, status } from "./Constants"
import  Task from "./Task"

export interface ProjectDatas{
    id: string
    name: string
}
export interface Find{
    projects: ProjectDatas[];
}

export default class Project{

    id : string = ''
    name : string = ''

    /**
     * @description Create a new deck by name, if it not exists
     * @param name The name for a new deck
    */
    createNew( 
        name: string, 
        success: (msg: string, deck: ProjectDatas) => void, 
        alreadyExist: (msg: string) => void)
    {
        this.id = uuid()
        this.name = name
        
        this.getAll( 
            projects =>{
                this.checkIfExist( projects, (exist) =>{
                    if( exist ){
                        this.saveIt(projects)
                        this.createTaskList(this.name)
                        return success("Salvo com sucesso!", this)
                    } else{
                        return alreadyExist(this.name+" já existe!")
                    }
                })
            },
            (msg) =>{
                this.saveFirstProject()
                return success("Salvo com sucesso!", this)
            }
        )
    }

    /**
     * @description Get all saved decks
    */
    getAll( success: (decks: any[]) => void, empty: (msg: string) => void ){
        const projects = localStorage.getItem("project")
        const rf =  projects !== null ? JSON.parse( projects ) : null
        return rf===null ? empty("Nenhum projeto salvo") : success(rf)
    }

    findByNameId(name: string, id: string){
        return new Promise<ProjectDatas> ( async (resolve, reject) =>{
            this.getAll(
                decks =>{
                    const found: ProjectDatas = decks.find(deck => deck.name===name && deck.id===id)
                    found !== undefined ? 
                        resolve({ id: found.id, name: found.name}) : 
                        reject({ msg: 'project not found'})
                },
                msg => reject({ msg: msg })
            )
        })
    }

    findAll(){
        return new Promise<Find>( async (resolve, reject) =>{
            const projects = localStorage.getItem("project")
            const projectList: ProjectDatas[] = projects !== null ? JSON.parse( projects ) : null
            projectList === null ? 
                reject({ msg: "Project vazio" }) : 
                resolve({ projects: projectList })
        })
    }

    async findByName(projectName: string){
        const list  = await this.findAll()
        const exist = list.projects.find( ({name}: ProjectDatas) => name === projectName)
        return exist !== undefined
    }

    /**
     * @description Find a saved deck by name
    */
    checkIfExist( decks: any[], callback: (exist: boolean) => void){
        return callback( 
            decks.find( 
                ( e : ProjectDatas) => e.name === this.name) === undefined
            )
    }

    /**
     * @description Save this deck
    */
    saveIt(decks: any[]){
        decks.push( this )
        localStorage.setItem("project", JSON.stringify(decks))
    }

    /**
     * @description If has no deck, it will save the first.
    */
    saveFirstProject(){
        localStorage.setItem("project", `[ ${ JSON.stringify(this)} ]`)
        this.createTaskList(this.name)
    }

    async preloader(){
        let current: string = ''
        try {
            await this.findAll()
            const c = localStorage.getItem("currentProject")
            current = c !== null ? c : ''
        } catch (error) {
            this.createNew(
                constants.default, 
                success => localStorage.setItem("currentProject", constants.default),
                exist   => console.log('fatal error: local storage')
            )
            current = constants.default
        }
        return current
    }

    async saveCurrentProject(name: string){
        const exist = await this.findByName(name)
        if( exist ) localStorage.setItem("currentProject", name)
    }

    isCurrent(name: string){
        const c = localStorage.getItem("currentProject")
        const current = c !== null ? c : ''
        return name === current
    }

    getCurrentProject(){
        const project = localStorage.getItem("currentProject")
        return project !== null ? project : constants.default
    }

    private createTaskList(projectName: string){
        localStorage.setItem(`tasks[${projectName}]`, '[]')
    }

    async tasksOfCurrent(){
        const current = await this.preloader()
        let tasks = Project.getTasksFromStorage(current)
        if( tasks === null){
            this.createTaskList(current)
            tasks = Project.getTasksFromStorage(current)
        }
        return tasks
    }

    async tasksToDo(){
        return this.getTasks(status.todo)
    }

    async tasksDone(){
        return this.getTasks(status.done)
    }

    private async getTasks(status: boolean){
        const tasks = await this.tasksOfCurrent()
        return tasks.filter( (task: Task) => task.done === status)
    }

    static getTasksFromStorage(project: string){
        let preTasks = localStorage.getItem(`tasks[${project}]`) 
        return preTasks !== null ? JSON.parse( preTasks ): null
    }

    async addTask(text: string){
        const task = new Task(text)
        const tasks = await this.tasksOfCurrent()
        tasks.push(task)

        const current = await this.preloader()
        localStorage.setItem(`tasks[${current}]`, JSON.stringify(tasks))

        return task
    }

    deleteByName(projectName: string){
        if( projectName !== constants.default){
            //drop tasks
            localStorage.removeItem(`tasks[${projectName}]`)
            //drop project
            this.getAll(
                projects =>{
                    const item = projects.find( (p: any) => p.name === projectName)
                    const index = projects.indexOf(item)
                    projects.splice(index,1)
                    localStorage.setItem('project', JSON.stringify(projects))
                },
                empty =>{}
            )

            // check if is current
            if( this.isCurrent(projectName)){
                //set default project as current
                localStorage.setItem("currentProject", constants.default)
            }
        }
    }
}