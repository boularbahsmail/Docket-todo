import '../styles/globals.css'
import type { AppProps } from 'next/app'
import ProjectProvider from '../contexts/ProjectContext'
import ListProvider from '../contexts/TaskContext'
import NotificationProvider from '../contexts/NotificationContext'

function MyApp({ Component, pageProps }: AppProps) {
  return  <ProjectProvider>
            <NotificationProvider>
              <ListProvider>
                <Component {...pageProps} />
              </ListProvider> 
            </NotificationProvider>
          </ProjectProvider>
}

export default MyApp
