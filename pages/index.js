import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {useState} from 'react';
import {useAuth} from  '../context/auth';
import client  from '../services/api';


export default function Home(props) {
  const {login, isLoading} = useAuth();

  let tap = {
    background:"black",
    fontColor:"white",
  }

  const [form, setForm] = useState({
    username: '',
    password: '',
  })

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
  const onSubmit = (e) => {
    e.preventDefault();
    login(form.username, form.password)
  }
  const test = (e) => {
    e.preventDefault();
    const resp = client.get("/user");
    console.log(resp)
   
  }
  return (
    <div className={styles.container}>
      <form>
        <label>
          usr
          <input type="text" name="username" value={form.username} onChange={handleInput} />
        </label>
        <label>
          pw
          <input type="text" name="password" value={form.password} onChange={handleInput} />
          <button onClick={onSubmit}>
            login
          </button>
          <button onClick={test}>
            troru
          </button>
        </label>
      </form>
      <p className={styles.loginPara} onClick={() => {console.log('login')}}> Login </p>
    </div>
  )
}
