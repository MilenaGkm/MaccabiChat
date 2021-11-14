const axios = require('axios')

const urlApi = `http://localhost:3001`;

export function getAllUsersApi() {
    const users = axios.get(`${urlApi}/lol`);
    return users
}