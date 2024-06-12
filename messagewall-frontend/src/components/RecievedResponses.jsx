import Message from "./Message";

const RecievedResponses = ({
  questions,
  messages,
  handleLike,
  toggleQuestionVisibility,
  visibleQuestions,
  selectedFilter,
  handleVisibleQuestionsChange,
}) => {
  // メッセージをレンダリングする関数
  const renderMessage = (question) => {
    return (
      messages
        // 特定の質問に関連するメッセージのみフィルタリングし、Messageコンポーネントを生成する
        .filter((message) => message.question === question)
        .map((message) => (
          <Message key={message.id} message={message} handleLike={handleLike} />
        ))
    );
  };

  return (
    <div>
      <h1>いただいた答え</h1>
      <h3>フィルター</h3>
      {/* 見える質問のメッセージをフィルター */}
      <select
        name="visibleQuestions"
        value={selectedFilter}
        onChange={handleVisibleQuestionsChange}
      >
        <option key="all" value="all">
          全部
        </option>
        {/* 全ての質問と、それぞれの質問に対する選択肢を生成 */}
        {questions.map((question) => (
          <option key={question} value={question}>
            {question}
          </option>
        ))}
      </select>
      {/* visibleQuestionsをマップして表示 */}
      {visibleQuestions.map((q) => (
        <div key={q.question}>
          <div className="questionTitle">
            <h2 onClick={() => toggleQuestionVisibility(q.question)}>
              {q.question}
            </h2>
          </div>
           {/* q.visible === true の場合はその質問に対応するメッセージを表示 */}
          {q.visible && <ul>{renderMessage(q.question)}</ul>}
        </div>
      ))}
    </div>
  );
};

export default RecievedResponses;
