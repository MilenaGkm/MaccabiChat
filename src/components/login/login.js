import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useNavigate, Link } from 'react-router-dom'
import { connect } from "react-redux";
import { getAllUsers, loginUser } from '../../redux/actions/users';
import "./login.css"

const Login = ({ apiUser, signinUser }) => {
    const [userForm, setUserForm] = useState({ username: "", password: "" });
    let navigate = useNavigate();

    const handleUserInputs = (key, value) => setUserForm({ ...userForm, [key]: value })

    const submitUser = async () => {
        await signinUser(userForm)
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
            <button onClick={submitUser} class="login-btn">Login</button>
            <button onClick={() => navigate('/signup')} type="submit" class="signup-btn">Signup</button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    apiUsers: state.users.users,
    apiUser: state.users.user,
    isLoading: state.users.loading,
    error: state.users.error,
    state: state
})

const mapDispatchToProps = (dispatch) => ({
    fetchAllUsers: () => dispatch(getAllUsers()),
    signinUser: (userForm) => dispatch(loginUser(userForm)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);