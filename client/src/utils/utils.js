import axios from "axios";

const API=axios.create({baseURL:"https://chatapp-kdac.onrender.com/",})
// Bekend Url https://chatapp-kdac.onrender.com/ ,http://localhost:8000

export {axios,API}