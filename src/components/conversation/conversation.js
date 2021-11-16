import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);

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

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={`https://picsum.photos/seed/${user?._id}/40/40`}
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}