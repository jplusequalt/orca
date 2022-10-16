require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Board = require("./model/board");
const Task = require("./model/tasks");

const app = express();
app.use(cors());
app.use(express.json());

const url = process.env.MONGODB_URI;
console.log(`Connecting to ${url}`);

mongoose.connect(url)
  .then(_ => console.log('Connected to MongoDB'))
  .catch(error => console.log('error connecting to MongoDb: ', error));
  
const buildBoard = tasks => {
  let taskHeaders = ['Todo', 'Blocked', 'In Progress', 'Completed', 'Backlog'];
  let columns = taskHeaders.reduce((obj, keys) => (obj[keys] = [], obj), {});
  return tasks.reduce((cols, task) => {
    if (taskHeaders.includes(task.status)) {
      cols[task.status].push(task);
    }
    return cols;
  }, columns);
}

app.get('/api/boards', (req, res) => {
  Board.find({}).then(boards => {
    let boardTags = boards.map(board => board);
    return res.json(boardTags);
  });
});

app.post('/api/boards', (req, res, next) => {
  let body = req.body;

  let board = new Board({
    name: body.name,
    users: body.users,
    tag: body.tag
  });

  board.save().then(_ => {
    return res.status(204).send('Successful');
  }).catch(err => next(err));
});

app.get('/api/board/:tag', (req, res) => {
  let boardTag = req.params.tag;
  Task.find({ board: boardTag }).then(tasks => {
    let cols = buildBoard(tasks);
    return res.json(cols);
  });
});

app.post('/api/tasks', (req, res, next) => {
  const body = req.body;

  const task = new Task({
    board: body.board,
    title: body.title,
    description: body.description,
    assignee: body.assignee,
    status: body.status,
    tag: body.tag,
    date: new Date(),
  });

  task.save().then(_ => {
    return res.status(204).send('Successful');
  }).catch(err => next(err));
});

app.put('/api/tasks/:id', (req, res, next) => {
  const body = req.body;

  const task = {
    title: body.title,
    description: body.description,
    assignee: body.assignee,
    status: body.status,
    tag: body.tag,
    date: new Date(),
  }

  Task.findByIdAndUpdate(req.params.id, task, { new: true })
    .then(_ => {
      return res.status(204).send('Successful');
    })
    .catch(err => next(err));
});

app.delete('/api/tasks/:id', (req, res, next) => {
  Task.findByIdAndRemove(req.params.id)
    .then(_ => res.status(204).end())
    .catch(err => next(err));
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint' });
}

app.use(unknownEndpoint);

const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message });
  }

  next(err);
}

app.use(errorHandler);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});