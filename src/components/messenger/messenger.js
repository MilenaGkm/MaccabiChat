import "./messenger.css";
import { BrowserRouter as Router, useNavigate, } from 'react-router-dom'
import { getUserConversations } from '../../redux/actions/conversations';
import { getConversationMessages, addNewMessage } from '../../redux/actions/messages';
import { connect } from "react-redux";
import Conversation from "../conversation/conversation";
import Message from "../messeage/Message";
import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";


const Messenger = ({ state, conversations, messagesA, apiUsers, apiUser, signinUser, fetchAllUsers, fetchUserConversations, fetchConversationMessages, appendNewMessage }) => {
    // const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const scrollRef = useRef();

    let navigate = useNavigate();

    useEffect(() => {
        if (!apiUser.auth) {
            navigate('/')
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: apiUser.user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        // const receiverId = currentChat.members.find(
        //     (member) => member !== apiUser.user._id
        // );

        // socket.current.emit("sendMessage", {
        //   senderId: apiUser._id,
        //   receiverId,
        //   text: newMessage,
        // });

        try {
            // const res = await axios.post("/messages", message);
            await appendNewMessage(message)
            // setMessages([...messages, res.data]);
            setNewMessage("");
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(async () => {
        await fetchUserConversations(apiUser.user._id);
    }, [apiUser]);

    useEffect(async () => {
        await fetchConversationMessages(currentChat?._id)
    }, [currentChat]);


    // console.log(conversations);
    // console.log(messagesA);
    // console.log(state);
    // console.log(apiUser.user._id);
    return (
        <div className="messenger">
            <div className="chatMenu">
                <div className="chatMenuWrapper">
                    <input placeholder="Search for friends" className="chatMenuInput" />
                    {conversations.map((c, i) => (
                        <div key={i} onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser={apiUser} />
                        </div>
                    ))}
                </div>
            </div>
            <div className="chatBox">
                <div className="chatBoxWrapper">
                    {currentChat ? (
                        <>
                            <div className="chatBoxTop">
                                {messagesA.map((m, i) => (
                                    <div key={i} ref={scrollRef}>
                                        <Message message={m} own={m.sender === apiUser.user._id} />
                                    </div>
                                ))}
                            </div>
                            <div className="chatBoxBottom">
                                <textarea
                                    className="chatMessageInput"
                                    placeholder="write something..."
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    value={newMessage}
                                ></textarea>
                                <button className="chatSubmitButton" onClick={handleSubmit}>
                                    Send
                                </button>
                            </div>
                        </>
                    ) : (
                        <span className="noConversationText">
                            Open a conversation to start a chat.
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    apiUsers: state.users.users,
    apiUser: state.users.user,
    conversations: state.conversations.conversations,
    messagesA: state.messages.messages,
    isLoading: state.users.loading,
    error: state.users.error,
    state: state
})

const mapDispatchToProps = (dispatch) => ({
    fetchUserConversations: (userId) => dispatch(getUserConversations(userId)),
    fetchConversationMessages: (chatId) => dispatch(getConversationMessages(chatId)),
    appendNewMessage: (msg) => dispatch(addNewMessage(msg)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);