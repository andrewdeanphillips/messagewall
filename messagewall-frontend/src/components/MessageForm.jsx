const MessageForm = ({
        nameForm, handleNameFormChange, contentForm, handleContentFormChange, addMessage
    }) => {
    return (
        <form className="messageForm" onSubmit={addMessage}>
        <div>
          name: <input value={nameForm} onChange={handleNameFormChange} />
        </div>
        <div>
          content: <input value={contentForm} onChange={handleContentFormChange} />
        </div>
        <div>
          <button type="submit">submit</button>
        </div>
      </form>
    )
}
  export default MessageForm;