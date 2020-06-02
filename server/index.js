const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const {addUser, removeUser ,getUser} = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let answers = [];

io.on('connection', (socket) => {
  socket.on('join', ({animal, room}, callback) => {
    const {error, user} = addUser({id: socket.id, animal})
    if(error) return callback(error);

    socket.join(room);

    console.log(`${user.animal} come.`)

    callback();
  })

  socket.on('sendMessage', ({room, message}, callback) => {
    const user = getUser(socket.id);
    io.to(room).emit('message', {user: user.animal, text: message});

    callback();
  })

  socket.on('sendAnswer', ({room, answer}, callback) => {
    answers.push(answer);
    if(answers.length === 2) {
      if(answers[0] === answers[1]) {
        io.to(room).emit('markQuiz', 'right');
      } else {
        io.to(room).emit('markQuiz', 'wrong');
      }
      answers = [];
    }
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log(`${user.animal} has left.`)
  })
});

app.use(cors());

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));