const Message = ({ message, handleLike }) => {
  return (
    <li className="message">
              <div className="message=content">
        <p>{message.content}</p>
      </div>
      <div className="message-info">
        <p>Question type: {message.question}</p>
        <p>Author: {message.author}</p>
        <p>Likes: {message.likes}</p>
        <button onClick={handleLike(message.id)}>Like</button>
      </div>

    </li>
  );
};

export default Message;
