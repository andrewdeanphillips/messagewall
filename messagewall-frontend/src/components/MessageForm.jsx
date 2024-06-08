const MessageForm = ({
  nameForm,
  handleNameFormChange,
  contentForm,
  questionForm,
  handleQuestionFormChange,
  handleContentFormChange,

  addMessage,
}) => {
  const questions = [
    "複数の人といるとき、私はどんな存在に見えますか？",
    "私の性格で、あなたが一番いいと思うところを教えてください。",
    "私の性格で、就活上で気をつけたほうがいいことを教えてください。",
    "他の人にはない、私の個性的なところを教えてください。",
    "私に一言、応援メッセージをお願いします！",
  ];

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
