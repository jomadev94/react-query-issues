import axios from "axios";

const {VITE_TOKEN:token}=import.meta.env;

export const githubAPI= axios.create({
    baseURL:"https://api.github.com/repos/facebook/react",
    headers:{
        Authorization: `Bearer ${token}`
    }
})