import questions from "../questions.json";

const MessageForm = ({
  nameForm,
  handleNameFormChange,
  contentForm,
  questionForm,
  handleQuestionFormChange,
  handleContentFormChange,

  addMessage,
}) => {
  return (
    <form className="messageForm" onSubmit={addMessage}>
      <select
        name="question"
        value={questionForm}
        onChange={handleQuestionFormChange}
      >
        {questions.map((question) => (
          <option key={question} value={question}>
            {question}
          </option>
        ))}
      </select>
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
  );
};
export default MessageForm;
