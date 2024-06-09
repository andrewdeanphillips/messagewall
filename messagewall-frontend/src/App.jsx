import { useState, useEffect } from "react";
import Message from "./components/Message";
import messageService from "./services/messages";
import MessageForm from "./components/MessageForm";
import questions from "./questions.json";

import "./App.css";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [nameForm, setNameForm] = useState("");
  const [contentForm, setContentForm] = useState("");
  const [selectedQuestionForm, setSelectedQuestionForm] = useState(
    questions[0]
  );
  const [visibleQuestions, setViewableQuestions] = useState(
    questions.map((q) => {
      return { question: q, visible: true };
    })
  );

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
  };

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
        setSelectedQuestionForm(questions[0]);
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

  const filterMessagesByQuestion = (question) => {
    return messages.filter((message) => message.question === question);
  };

  const renderMessages = (question) => {
    return filterMessagesByQuestion(question).map((message) => (
      <Message key={message.id} message={message} handleLike={handleLike} />
    ));
  };

  const toggleQuestionVisibility = (question) => {
    setViewableQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.question === question ? { ...q, visible: !q.visible } : q
      )
    );
  };

  return (
    <div className="container">
      <div>
        <h1>他己分析にご協力をお願いいたします。</h1>
        <p>
          日本で就活したいと考えていますが、他の人が私のことをどう思っているか知ることが、面接の時に役に立つかもしれません。
          普通の応援メッセージでもいいから、とりあえず答えてください！フォームの下にみんなの答えが見られます。
          良いと思った回答があれば、「いいね！」を押してください。
        </p>
      </div>
      <h2>アンドリューについて答えて！</h2>
      <MessageForm
        nameForm={nameForm}
        handleNameFormChange={handleNameFormChange}
        contentForm={contentForm}
        handleContentFormChange={handleContentFormChange}
        selectedQuestionForm={selectedQuestionForm}
        handleQuestionFormChange={handleQuestionFormChange}
        addMessage={addMessage}
      />
      <h1>いただいた答え</h1>
      {visibleQuestions.map((q) => (
        <div key={q.question}>
          <h2
            onClick={() => toggleQuestionVisibility(q.question)}
            style={{ cursor: "pointer", backgroundColor: "#E0FFFF" }}
          >
            {q.question}
          </h2>
          {q.visible && <ul>{renderMessages(q.question)}</ul>}
        </div>
      ))}
    </div>
  );
};

export default App;
