import axios from 'axios';

const client = axios.create({
    baseURL: "http://localhost:8080/v1/auth",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

export default client;