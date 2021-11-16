import "./message.css";

export default function Message({ message, own, setMessages }) {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={`https://picsum.photos/seed/${message.sender}/32/32`}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      {/* {own ? <span className="messageBottom">own</span> : < span className="messageBottom">nope</span>} */}
      {/* <div className="messageBottom">seen</div> */}
    </div>
  );
}