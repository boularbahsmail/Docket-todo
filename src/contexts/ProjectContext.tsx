import { createContext, ReactNode, useEffect, useState } from "react";
import Project from "../models/Project";

export interface ContextProps{
    children: ReactNode;
}
interface ProjectContextDatas{
    currentProject: string;
    changeCurrentProject: (name: string) => void;
    projectItems: JSX.Element[];
    saveProjectList: (list: JSX.Element[]) => void;
    removeItem: (key: string) => void;
}

export const ProjectContext = createContext({} as ProjectContextDatas)

export default function ProjectProvider({ children} : ContextProps){

    const [currentProject, setCurrentProject] = useState('')
    const [projectItems, saveProjectList] = useState([<></>])

    const removeItem = (key: string) =>{
        const item = projectItems.find( (item: any) => item.key === key)
        if(item !== undefined){
            const index = projectItems.indexOf(item)
            projectItems.splice(index,1)
            const merged = projectItems.concat([])
            saveProjectList(merged)
        }
    }
    
    const changeCurrentProject = async (name: string) => {
        await new Project().saveCurrentProject(name)
        setCurrentProject(name)
    }

    const getCurrent = async () =>{
        const current = await new Project().preloader()
        setCurrentProject( current )
    }

    useEffect( () => { getCurrent() }, [])

    return(
        <ProjectContext.Provider value={{
            currentProject,
            changeCurrentProject,
            projectItems,
            saveProjectList,
            removeItem
        }}>
            {children}
        </ProjectContext.Provider>
    )
}