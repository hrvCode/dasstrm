import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useState} from 'react';
import {useAuth, protectiveRoutes} from '../context/auth';
import client from '../services/api';
import {Router, useRouter} from 'next/router';

function Home(props) {
  const router = useRouter();
  const {login, isLoading, logOut} = useAuth();

  let tap = {
    background: 'black',
    fontColor: 'white',
  };

  const [form, setForm] = useState({
    username: '',
    password: '',
  });

  const handleInput = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    login(form.username, form.password);
  };
  const test = (e) => {
    e.preventDefault();
    logOut();
  };

  return (
    <div className={styles.container}>
      <form>
        <label>
          usr
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleInput}
          />
        </label>
        <label>
          pw
          <input
            type="text"
            name="password"
            value={form.password}
            onChange={handleInput}
          />
          <button onClick={onSubmit}>login</button>
        </label>
      </form>
      <button onClick={test}>submit</button>
    </div>
  );
}

export default Home;
