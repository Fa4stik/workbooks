import axios from 'axios'

export const $api = axios.create({
    baseURL: (process.env.REACT_APP_SERVER_PATH ?? window.location.origin) + '/api'
})