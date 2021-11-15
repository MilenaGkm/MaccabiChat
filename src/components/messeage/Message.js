import "./message.css";

export default function Message({ message, own }) {
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
      {/* <div className="messageBottom">seen</div> */}
    </div>
  );
}