const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

// MongoDBのURIを環境変数から取得
const url = process.env.MONGODB_URI

// 接続情報をコンソールに出力
console.log('connecting to', url)

// MongoDBに接続
mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// スキーマの定義
const messageSchema = new mongoose.Schema({
  question: { type: String },
  content: { type: String, minLength: 1, required: true },
  author: { type: String, minLength: 1, required: true },
  created_at: { type: Date, default: Date.now, required: true},
  likes: { type: Number, default: 0, required: true }
})

// JSON変換時に_idと__vを削除
messageSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Message', messageSchema)
