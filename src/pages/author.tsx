import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../components/Header'
import styles from '../styles/about.module.css'
import { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'
import Footer from '../components/Footer'

// React Icons
import { FiTwitter, FiInstagram } from 'react-icons/fi'

const Author: NextPage = () => {

  const{ notification } = useContext(NotificationContext)

  return (
    <div>
      <Head>
        <title>Docket - Author</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;700&display=swap" rel="stylesheet"/> 
      </Head>
      <Header openProjects={()=>{}} />
      <main className={`${styles.mainContent} centerContainer`}>
            <section className={styles.contentBlock}>
              <div className={styles.textBlock}>
                <h2>🙌 Who am i?</h2>
                <p>
                  Wassup boys & girls 🫶<br />
                  I am <b>Ismail Boularbah</b> aka <Link href="https://ismailium.vercel.app"><a target="_blank">Ismailium</a></Link>, Software Developer, Cuber, Chess, and F1 lover.<br />
                  I have been coding for almost 4 years building learning/freelancing projects using HTML5, CSS3, TailwindCSS, JavaScript, React.js, Next.js, Firebase, Restful APIs...<br />
                  I love writing lines of code while staying hydrated.<br />
                  <b>So yeah, Drink your water a chabab {"<3"}</b>
                </p>
                <h3>Find me on: </h3>
                <ul>
                  <li>
                    <Link href="https://twitter.com/boularbahsmail">
                      <a target="_blank" title="Twitter">
                        <FiTwitter />
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </section>

            <section className={styles.contentBlock}>
              <img src="https://ik.imagekit.io/lrjseyuxi3m/todoapp/undraw_checklist__re_2w7v_1_EBpT5tUGgO.png?updatedAt=1636555587766" alt="" />
              <div className={styles.textBlock}>
                <h2>About the project</h2>
                <p>It&apos;s a simple <b>web app</b> project that provides some features to you to be able to manage your projects and tasks easily.</p>
              </div>
            </section>            
      </main>
      <Footer/>
      {notification}
    </div>
  )
}

export default Author
