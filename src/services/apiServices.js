const axios = require('axios')

const urlApi = `http://localhost:3001`;

export function getAllUsersApi() {
    const users = axios.post(`${urlApi}/users`);
    return users
}

// export function getUserApi() {
//     const users = axios.post(`${urlApi}/user`);
//     return user
// }

// export async function userAuthenticated(token) {
    // console.log(token);
    // const auth = await axios.get(`${urlApi}/isUserAuth`, {
    //     headers: {
    //         "x-access-token": "Bearer " + token
    //     }
    // })
    // console.log(auth);
// }

export async function login(loginData) {
    const user = await axios.post(`${urlApi}/login`, loginData)
    const auth = await axios.get(`${urlApi}/isUserAuth`, {
        headers: {
            "x-access-token": user.data.token
        }
    })
    console.log(auth);
    return user
}
