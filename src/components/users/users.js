import axios from "axios";
import { useEffect, useState } from "react";
import "./users.css";
import { connect } from "react-redux";
import { getAllUsers, loginUser } from '../../redux/actions/users';

const Users = ({ onlineUsers, currentId, setCurrentChat, conversations }) => {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const users = onlineUsers.filter((member) => member._id !== currentId)
    console.log(users);
    // console.log(conversations.filter((member) => member.members._id !== users.map((user) => user._id)));
    // console.log(onlineUsers.filter((member) => member._id !== conversations.filter((member) => member.members._id)));
  }, [conversations]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `http://localhost:3001/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(friends);
  console.log(onlineUsers.filter((member) => member._id !== currentId));
  // console.log(onlineUsers);

  return (
    <div className="chatOnline">
      {onlineUsers.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={`https://picsum.photos/seed/${o._id}/40/40`}
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = (state) => ({
  apiUsers: state.users.users,
  apiUser: state.users.user,
  conversations: state.conversations.conversations,
  isLoading: state.users.loading,
  error: state.users.error,
  state: state
})

const mapDispatchToProps = (dispatch) => ({
  fetchAllUsers: () => dispatch(getAllUsers()),
  signinUser: (userForm) => dispatch(loginUser(userForm)),
  // addUser: (formUser) => dispatch(addToDbUser(formUser)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Users);