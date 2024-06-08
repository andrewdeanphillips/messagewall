const Message = ({ message }) => {
  return (
    <li className="message">
      <p>Content: {message.content}</p>
      <p>Author: {message.author}</p>
      <p>Likes: {message.likes}</p>
    </li>
  );
};

export default Message;
