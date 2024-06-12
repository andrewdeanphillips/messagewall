import questions from "../questions.json";

const MessageForm = ({
  nameForm,
  handleNameFormChange,
  contentForm,
  selectedQuestionForm,
  handleQuestionFormChange,
  handleContentFormChange,

  addMessage,
}) => {
  return (
    <div>
      <h2>アンドリューについて答えて！</h2>
      <form className="messageForm" onSubmit={addMessage}>
        <h3>質問を選んで送信してください。複数回回答することも可能です。</h3>
        <select
          name="question"
          value={selectedQuestionForm}
          onChange={handleQuestionFormChange}
        >
          {questions.map((question) => (
            <option key={question} value={question}>
              {question}
            </option>
          ))}
        </select>
        <div>
          <h3>ニックネーム</h3>
          <textarea value={nameForm} onChange={handleNameFormChange} />
        </div>
        <div>
          <h3>答え</h3>
          <textarea
            value={contentForm}
            onChange={handleContentFormChange}
            className="formAnswer"
          />
        </div>
        <div>
          <button type="submit">送信</button>
        </div>
      </form>
    </div>
  );
};
export default MessageForm;
