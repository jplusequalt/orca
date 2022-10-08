require("dotenv").config();
const express = require("express");
const cors = require("cors");
const Task = require("./tasks");

const app = express();
app.use(cors());
app.use(express.json());

let taskHeaders = ['Todo', 'Blocked', 'In Progress', 'Completed', 'Backlog'];

const buildColumns = tasks => {
  let columns = taskHeaders.reduce((obj, keys) => (obj[keys] = [], obj), {});
  return tasks.reduce((cols, task) => {
    if (taskHeaders.includes(task.status)) {
      cols[task.status].push(task);
    }
    return cols;
  }, columns);
}

app.get('/api/columns', (req, res) => {
  Task.find({}).then(tasks => {
    let cols = buildColumns(tasks);
    return res.json(cols);
  });
});

app.post('/api/tasks', (req, res, next) => {
  const body = req.body;
  console.log(body);

  const task = new Task({
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