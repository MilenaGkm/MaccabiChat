const axios = require('axios')

const urlApi = `http://localhost:3001`;

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

export function getAllUsersApi() {
    const users = axios.get(`${urlApi}/users`);
    return users
}

export function getUserConversations(userId) {
    console.log(userId);
    const userConversations = axios.get(`${urlApi}/conversations/${userId}`);
    console.log(userConversations);
    return userConversations
}

export function getConversationMessages(chatId) {
    console.log(chatId);
    const conversationMessages = axios.get(`${urlApi}/message/${chatId}`);
    console.log(conversationMessages);
    return conversationMessages
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

