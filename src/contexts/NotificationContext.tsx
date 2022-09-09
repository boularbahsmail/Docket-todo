import { createContext, useState } from "react";
import Notification from "../components/Notification";
import { ContextProps } from "./ProjectContext"

interface NotificationDatas{
    notification: JSX.Element;
    clearNotification: () => void;
    addNotification: (message: string) => void;
    addNotificationAndWait: (message: string) => void;

}

export const NotificationContext = createContext({} as NotificationDatas)

export default function NotificationProvider({children} : ContextProps){

    const [notification, setNotification] = useState(<></>)

    const addNotificationAndWait = (message: string) =>{
        setNotification( <Notification message={message}/> )
    }

    const addNotification = (message: string) =>{
        addNotificationAndWait(message)
        setTimeout(() => { setNotification(<></>) }, 7000);
    }

    const clearNotification = () => setNotification(<></>)

    return(
        <NotificationContext.Provider value={{
            notification,
            clearNotification,
            addNotification,
            addNotificationAndWait
        }}>
            {children}
        </NotificationContext.Provider>
    )

}