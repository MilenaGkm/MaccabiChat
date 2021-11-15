import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.user._id);

    const getUser = async () => {
      try {
        const res = await axios("http://localhost:3001/user/" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  console.log(user);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={`https://picsum.photos/seed/${user?._id}/32/32`}
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}