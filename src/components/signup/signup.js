import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useNavigate, } from 'react-router-dom'
import { connect } from "react-redux";
import { getAllUsers, signupUser } from '../../redux/actions/users';
import "../login/login.css"


const Signup = ({ apiUser, addUser }) => {
    const [userForm, setUserForm] = useState({ username: "", password: "" });
    let navigate = useNavigate();

    const handleUserInputs = (key, value) => setUserForm({ ...userForm, [key]: value })

    const submitUser = async () => {
        await addUser(userForm)
    }

    useEffect(() => {
        if (apiUser.auth) {
            navigate('/messenger')
        }
    }, [apiUser.auth])

    return (

        <div class="login-panel">
            <h1 class="login-title">
                Maccabi<span class="light">Chat</span>
            </h1>
            <br />
            <div class="form-field">
                <label for="username">Username</label>
                <input
                    onChange={e => handleUserInputs(e.target.name, e.target.value)}
                    type="text"
                    name="username" />
            </div>

            <div class="form-field">
                <label for="password">Password</label>
                <input
                    onChange={e => handleUserInputs(e.target.name, e.target.value)}
                    type="password"
                    name="password" />
                <br />
            </div>
            <button onClick={submitUser} class="signupBtn">Signup</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    apiUser: state.users.user,
    isLoading: state.users.loading,
    error: state.users.error,
    state: state
})

const mapDispatchToProps = (dispatch) => ({
    fetchAllUsers: () => dispatch(getAllUsers()),
    addUser: (formUser) => dispatch(signupUser(formUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Signup);