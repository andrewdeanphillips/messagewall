import { useState, useEffect } from "react";
import messageService from "./services/messages";
import MessageForm from "./components/MessageForm";
import questions from "./questions.json";

import "./App.css";
import RecievedResponses from "./components/RecievedResponses";

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

  const [selectedFilter, setSelectedFilter] = useState("all");

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
    setSelectedFilter(selection);

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
      <MessageForm
        nameForm={nameForm}
        handleNameFormChange={handleNameFormChange}
        contentForm={contentForm}
        handleContentFormChange={handleContentFormChange}
        selectedQuestionForm={selectedQuestionForm}
        handleQuestionFormChange={handleQuestionFormChange}
        addMessage={addMessage}
      />
      <RecievedResponses
        questions={questions}
        messages={messages}
        handleLike={handleLike}
        toggleQuestionVisibility={toggleQuestionVisibility}
        visibleQuestions={visibleQuestions}
        selectedFilter={selectedFilter}
        handleVisibleQuestionsChange={handleVisibleQuestionsChange}
      />
    </div>
  );
};

export default App;
