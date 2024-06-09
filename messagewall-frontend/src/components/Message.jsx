const Message = ({ message, handleLike }) => {
  const localDate = new Date(message.created_at).toLocaleString();
  
  return (
    <li className="message">
      <div className="post-header">
        <div className="user-info">
          <h3>{message.author}</h3>
          <p>Posted on: {localDate}</p>
        </div>
      </div>
      <div className="post-content">
        <p>{message.content}</p>
      </div>
      <div className="post-footer">
        <button className="like-btn" onClick={handleLike(message.id)}>
          いいね
        </button>
        <span className="like-count">{message.likes}件</span>
      </div>
    </li>
  );
};

export default Message;
