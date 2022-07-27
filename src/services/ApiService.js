import axios from "axios";

export default axios.create({
    baseURL: 'http://lab.com/api/v1/customer/'
})