const mongoose = require('mongoose')

mongoose.set('strictQuery', false)


const url = process.env.MONGODB_URI


console.log('connecting to', url)

mongoose.connect(url)

  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

const messageSchema = new mongoose.Schema({
  content: { type: String, minLength: 1, required: true },
  author: { type: String, minLength: 1, required: true },
  created_at: { type: Date, default: Date.now, required: true},
  likes: { type: Number, default: 0, required: true }
})


messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Message', messageSchema)