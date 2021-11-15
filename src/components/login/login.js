import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useNavigate, } from 'react-router-dom'
import { connect } from "react-redux";
import { getAllUsers, loginUser } from '../../redux/actions/users';

const Login = ({ state, apiUser, signinUser }) => {
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

        <div>
            <input onChange={e => handleUserInputs(e.target.name, e.target.value)}
                name="username"
                placeholder="Username" />
            <br />
            <input onChange={e => handleUserInputs(e.target.name, e.target.value)}
                name="password"
                type="password"
                placeholder="Password" />
            <br />
            <button onClick={submitUser} >Login</button>
            {/* {isLoading && <p>Loading...</p>}
            {apiUsers.length === 0 && !isLoading && <p>No users available!</p>}
            {error && !isLoading && <p>{error}</p>}
             */}
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
    // addUser: (formUser) => dispatch(addToDbUser(formUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login);