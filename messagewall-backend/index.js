require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Message = require('./models/message')
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))
app.use(morgan(':method :url :body'))

morgan.token('body', req => {
    return JSON.stringify(req.body)
})


app.get('/api/messages', (request, response) => {
    console.log('made it here')
    Message.find({}).then(result => {
        response.json(result)
    })
})

app.post('/api/messages', (request, response, next) => {
    const body = request.body

    const message = new Message({
        content: body.content,
        author: body.author
    })

    message.save().then(savedMessage => {
        response.json(savedMessage)
    })
        .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(process.env.MONGODB_URI)
})