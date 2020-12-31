import axios from 'axios';
const client = axios.create({
    baseURL: "http://localhost:8080/v1/auth",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
})

client.interceptors.response.use(function(response){
    if(response.status == 200){
        console.log(response.config)
        console.log(response.headers)
    }
    return response;
});

export default client;