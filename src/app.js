const express = require('express');
const data = require('../data');

const { checkProjectExists, requestCount } = require('./middlewares');

const app = express();

app.use(express.json());
app.use(requestCount);

app.get('/', (req, res) => {
  return res.json(data);
});

app.post('/projects', (req, res) => {
  const { id, title } = req.body;

  const project = {
    id,
    title,
    tasks: []
  };

  data.push(project);

  return res.json(project);
});

app.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const task = req.body.title;

  const project = data.find(e => e.id === id);
  project.tasks.push(task);

  return res.json(project);
});

app.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  const project = data.find(e => e.id === id);
  project.title = title;

  return res.json(project);
});

app.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;

  const index = data.findIndex(e => e.id === id);

  data.splice(index, 1);

  return res.send();
});

app.listen(3000, () => {
  console.log('Server running on localhost:3000');
});
