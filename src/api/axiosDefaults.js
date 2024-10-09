


import axios from "axios";

axios.defaults.baseURL = "https://drf-artistrate-2125d79c56b7.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;
