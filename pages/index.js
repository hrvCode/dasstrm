import Head from 'next/head'
import styles from '../styles/Home.module.css'

export default function Home() {
  let tap = {
    background:"black",
    fontColor:"white",
  }
  return (
    <div className={styles.container}>
      <p className={styles.loginPara} onClick={() => {console.log('login')}}> Login </p>
    </div>
  )
}
