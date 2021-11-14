import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { getAllUsers, addToDbUser } from '../redux/actions/users';

const Chat = ({ state, apiUsers, isLoading, error, fetchAllUsers, addUser }) => {

    const handleSubmitUser = formUser => {
        addUser(formUser)
    }

    useEffect(() => {
        fetchAllUsers()
    }, [])

    console.log(apiUsers);
    console.log(state);

    return (
        <div>
            {/* {isLoading && <p>Loading...</p>}
            {apiUsers.length === 0 && !isLoading && <p>No users available!</p>}
            {error && !isLoading && <p>{error}</p>}
             */}
        </div>
    )
}

const mapStateToProps = (state) => ({
    apiUsers: state.users.users,
    isLoading: state.users.loading,
    error: state.users.error,
    state: state
})

const mapDispatchToProps = (dispatch) => ({
    fetchAllUsers: () => dispatch(getAllUsers()),
    // addUser: (formUser) => dispatch(addToDbUser(formUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Chat);