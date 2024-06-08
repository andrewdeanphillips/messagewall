const Message = ({ message, handleLike }) => {
  return (
    <li className="message">
      <p>Content: {message.content}</p>
      <p>Author: {message.author}</p>
      <p>Likes: {message.likes}</p>
      <button onClick={handleLike(message.id)}>Like</button>
    </li>
  );
};

export default Message;
