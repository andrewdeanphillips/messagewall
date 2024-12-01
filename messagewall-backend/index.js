require("dotenv").config(); // 環境変数をロード
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Message = require("./models/message"); // Messageモデルをインポート
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("dist"));
app.use(morgan(":method :url :body")); // HTTPリクエストのロギング

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

// メッセージの全件取得エンドポイント
app.get("/api/messages", (request, response) => {
  Message.find({}).then((result) => {
    response.json(result);
  });
});

// 新しいメッセージを追加するエンドポイント
app.post("/api/messages", (request, response, next) => {
  const body = request.body;

  const message = new Message({
    question: body.question,
    content: body.content,
    author: body.author,
  });

  message
    .save()
    .then((savedMessage) => {
      response.json(savedMessage);
    })
    .catch((error) => next(error));
});

// IDでメッセージを取得するエンドポイント
app.get('/api/messages/:id', (request, response, next) => {
    Message.findById(request.params.id)
      .then(message => {
        if (message) {
          response.json(message)
        } else {
          response.status(404).end()
        }
      })
      .catch(error => next(error))
  })

// いいねを増やすエンドポイント
app.patch("/api/messages/:id", (request, response, next) => {
  Message.findByIdAndUpdate(
    request.params.id,
    { $inc: { likes: 1 } },
    { new: true }
  )
    .then((updatedPerson) => {
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

// 不明なエンドポイントハンドラー
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// エラーハンドラー
const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

app.use(unknownEndpoint);
app.use(errorHandler);

// サーバーを起動
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(process.env.MONGODB_URI);
});
