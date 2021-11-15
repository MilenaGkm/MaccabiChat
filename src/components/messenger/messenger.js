import React, { useEffect, useState } from "react";
import { getAllUsers, loginUser } from '../../redux/actions/users';
import { connect } from "react-redux";

const Messenger = ({ state, apiUser, signinUser }) => {
    console.log(state);
    return (
        <div className="messenger">
            lol
        </div>
    );
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
})

export default connect(mapStateToProps, mapDispatchToProps)(Messenger);