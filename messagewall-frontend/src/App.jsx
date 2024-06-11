import { useState, useEffect } from "react";
import Message from "./components/Message";
import messageService from "./services/messages";
import MessageForm from "./components/MessageForm";
import questions from "./questions.json";

import "./App.css";

const App = () => {
  // メッセージの状態を管理するためのフック
  const [messages, setMessages] = useState([]);
  // フォームの名前フィールドの状態を管理するためのフック
  const [nameForm, setNameForm] = useState("");
  // フォームの内容フィールドの状態を管理するためのフック
  const [contentForm, setContentForm] = useState("");
  // フォームで選択された質問の状態を管理するためのフック
  const [selectedQuestionForm, setSelectedQuestionForm] = useState(
    questions[0]
  );
  // 表示する質問の状態を管理するためのフック
  const [visibleQuestions, setViewableQuestions] = useState(
    questions.map((q) => {
      return { question: q, visible: true };
    })
  );

  // コンポーネントのマウント時にメッセージを取得するエフェクト
  useEffect(() => {
    messageService.getAll().then((initialMessages) => {
      setMessages(initialMessages);
    });
  }, []);

  // 名前フォームの変更ハンドラー
  const handleNameFormChange = (event) => {
    setNameForm(event.target.value);
  };

  // 内容フォームの変更ハンドラー
  const handleContentFormChange = (event) => {
    setContentForm(event.target.value);
  };

  // 質問フォームの変更ハンドラー
  const handleQuestionFormChange = (event) => {
    setSelectedQuestionForm(event.target.value);
  };

  // 新しいメッセージを追加する関数
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

  // メッセージに「いいね」を追加する関数
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

  // 質問に基づいてメッセージをフィルタリングする関数
  const filterMessagesByQuestion = (question) => {
    return messages.filter((message) => message.question === question);
  };

  // 質問に基づいてメッセージをレンダリングする関数
  const renderMessages = (question) => {
    return filterMessagesByQuestion(question).map((message) => (
      <Message key={message.id} message={message} handleLike={handleLike} />
    ));
  };

  // 質問の表示/非表示を切り替える関数
  const toggleQuestionVisibility = (question) => {
    setViewableQuestions((prevQuestions) =>
      prevQuestions.map((q) =>
        q.question === question ? { ...q, visible: !q.visible } : q
      )
    );
  };

  const setAllQuestionsTo = (boolValue) => {
    setViewableQuestions((prevQuestions) =>
      prevQuestions.map((q) => ({
        ...q,
        visible: boolValue,
      }))
    );
  };

  const handleVisibleQuestionsChange = (event) => {
    const selection = event.target.value;

    setSelectedQuestionForm(selection);

    if (selection === "all") {
      setAllQuestionsTo(true);
    } else {
      setViewableQuestions((prevQuestions) =>
        prevQuestions.map((q) => ({
          ...q,
          visible: q.question === selection,
        }))
      );
    }
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
      <h3>フィルター</h3>
      <select
        name="visibleQuestions"
        value={selectedQuestionForm}
        onChange={handleVisibleQuestionsChange}
      >
        <option key="all" value="all">
          全部
        </option>
        {questions.map((question) => (
          <option key={question} value={question}>
            {question}
          </option>
        ))}
      </select>
      {visibleQuestions.map((q) => (
        <div key={q.question}>
          <h2 onClick={() => toggleQuestionVisibility(q.question)}>
            {q.question}
          </h2>
          {q.visible && <ul>{renderMessages(q.question)}</ul>}
        </div>
      ))}
    </div>
  );
};

export default App;
