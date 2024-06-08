const Message = ({ message, handleLike }) => {
  return (
    <li className="message">
      <div className="post-header">
        <div className="user-info">
          <h3>{message.author}</h3>
          <p>Posted on: {message.created_at}</p>
        </div>
      </div>
      <div className="post-content">
        <p>{message.content}</p>
      </div>
      <div className="post-footer">
        <button className="like-btn" onClick={handleLike(message.id)}>
          Like
        </button>
        <span className="like-count">{message.likes} likes</span>
      </div>
    </li>
  );
};

export default Message;
