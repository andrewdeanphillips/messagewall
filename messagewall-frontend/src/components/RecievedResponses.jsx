import Message from "./Message"

const RecievedResponses = ({
  questions,
  messages,
  handleLike,
  toggleQuestionVisibility,
  visibleQuestions,
  selectedFilter,
  handleVisibleQuestionsChange,
}) => {


  const renderMessages = (question) => {
    return messages
      .filter((message) => message.question === question)
      .map((message) => (
        <Message key={message.id} message={message} handleLike={handleLike} />
      ));
  };


  return (
    <div>
      <h1>いただいた答え</h1>
      <h3>フィルター</h3>
      <select
        name="visibleQuestions"
        value={selectedFilter}
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
          <div className="questionTitle">
            <h2 onClick={() => toggleQuestionVisibility(q.question)}>
              {q.question}
            </h2>
          </div>
          {q.visible && <ul>{renderMessages(q.question)}</ul>}
        </div>
      ))}
    </div>
  );
};

export default RecievedResponses;
