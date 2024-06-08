import { useState, useEffect } from 'react'

import Message from './components/Message'
import messageService from './services/messages'

const App = () => {
  const [messages, setMessages] = useState([])
  console.log(messages)

  useEffect(() => {
    
    messageService
      .getAll()
      .then(initialMessages => {
        setMessages(initialMessages)
      })
  }, [])

  return (
    <div>
      <h1>Messages</h1>
      <ul>
      {messages.map(message => 
          <Message
            key={message.id}
            message={message}
          />
        )}
      </ul>
    </div>
  )
}

export default App