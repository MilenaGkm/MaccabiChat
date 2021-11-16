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

export async function signup(signupData) {
    const user = await axios.post(`${urlApi}/signup`, signupData)
    if (user.data.username) {
        const auth = await axios.get(`${urlApi}/isUserAuth`, {
            headers: {
                "x-access-token": user.data.token
            }
        })
    }
    return user
}

export function getAllUsersApi() {
    const users = axios.get(`${urlApi}/users`);
    return users
}

export function getUserConversations(userId) {
    const userConversations = axios.get(`${urlApi}/conversations/${userId}`);
    return userConversations
}

export function getConversationMessages(chatId) {
    const conversationMessages = axios.get(`${urlApi}/message/${chatId}`);
    return conversationMessages
}

export function addNewMessage(msg) {
    const postNewMessage = axios.post(`${urlApi}/message`, msg);
    return postNewMessage
}

export function updateMessage(id) {
    const putMessage = axios.put(`${urlApi}/message/${id}`);
    return putMessage
}
