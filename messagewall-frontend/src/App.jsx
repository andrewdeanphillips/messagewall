import { useState, useEffect } from "react";

import Message from "./components/Message";
import messageService from "./services/messages";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [nameForm, setNameForm] = useState("");
  const [contentForm, setContentForm] = useState("");

  useEffect(() => {
    messageService.getAll().then((initialMessages) => {
      setMessages(initialMessages);
    });
  }, []);

  const handleNameFormChange = (event) => {
    setNameForm(event.target.value);
  };


  const handleContentFormChange = (event) => {
    setContentForm(event.target.value);
  };

  const addMessage = (event) => {
    event.preventDefault();

    const newMessage = {
      author: nameForm,
      content: contentForm,
    };
    messageService
      .create(newMessage)
      .then(() => {
        return messageService.getAll();
      })
      .then((updatedMessages) => {
        setMessages(updatedMessages);
        setNameForm("");
        setContentForm("");
      })
      .catch((error) => {
        console.error("Error adding message:", error);
      });
  };

  return (
    <div>
      <h1>Messages</h1>
      <ul>
        {messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </ul>
      <form onSubmit={addMessage}>
        <div>
          name: <input value={nameForm} onChange={handleNameFormChange} />
        </div>
        <div>
          content:{" "}
          <input value={contentForm} onChange={handleContentFormChange} />
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    </div>
  );
};

export default App;
