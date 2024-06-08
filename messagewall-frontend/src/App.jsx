import { useState, useEffect } from "react";
import Message from "./components/Message";
import messageService from "./services/messages";
import MessageForm from "./components/MessageForm";
import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [nameForm, setNameForm] = useState("");
  const [contentForm, setContentForm] = useState("");
  const [selectedQuestionForm, setSelectedQuestionForm] = useState("")

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

  const handleQuestionFormChange = (event) => {
    setSelectedQuestionForm(event.target.value);
  }

  const addMessage = (event) => {
    event.preventDefault();

    const newMessage = {
      question: selectedQuestionForm,
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
        setSelectedQuestionForm("bestPersonality");
      })
      .catch((error) => {
        console.error("Error adding message:", error);
      });
  };

  const handleLike = (id) => (event) => {
    event.preventDefault();

    messageService
      .addLike(id)
      .then(() => {
        return messageService.getAll();
      })
      .then((updatedMessages) => {
        setMessages(updatedMessages);
      })
      .catch((error) => {
        console.error("Error liking message:", error);
      });
  };

  return (
    <div className="container">
      <h1>Messages</h1>
      <ul>
        {messages.map((message) => (
          <Message key={message.id} message={message} handleLike={handleLike} />
        ))}
      </ul>
      <MessageForm
        nameForm={nameForm}
        handleNameFormChange={handleNameFormChange}
        contentForm={contentForm}
        handleContentFormChange={handleContentFormChange}
        selectedQuestionForm= {selectedQuestionForm}
        handleQuestionFormChange={handleQuestionFormChange}
        addMessage={addMessage}
      />
    </div>
  );
};

export default App;
