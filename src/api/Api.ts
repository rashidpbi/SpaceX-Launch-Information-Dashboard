import axios from 'axios'

const api = axios.create({
    baseURL:'https://api.spacexdata.com/v3'
})

export const getLaunches = () => api.get('/launches');