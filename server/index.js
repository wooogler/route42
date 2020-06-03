const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const {addUser, removeUser ,getUser, getAllUsers} = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket) => {
  socket.on('join', ({animal, room}, callback) => {
    const {error, user} = addUser({id: socket.id, animal})
    if(error) return callback(error);

    socket.join(room);
    console.log(`${user.animal} come to ${room} room.`)
    const joinedUser = getAllUsers();
    console.log(joinedUser);
    if(!joinedUser.some(user => user.animal === 'anonymous')) {
      console.log('Start CountDown!')
      let count = 30;
      const countdown = setInterval(() => {
        console.log('count:', count);
        io.to(room).emit('countdown', count);
        count = count - 1;
        if(count === 0) {
          clearInterval(countdown);
        }
      },1000)
    }

    callback();
  })

  socket.on('sendMessage', ({room, message}, callback) => {
    const user = getUser(socket.id);
    io.to(room).emit('message', {user: user.animal, text: message});

    callback();
  })

  let answers = [];
  socket.on('sendAnswer', ({room, answer}, callback) => {
    answers.push(answer);
    console.log(answer);
    if(answers.length === 2) {
      if(answers[0] === 'no answer' || answers[1] === 'no answer') {
        io.to(room).emit('markQuiz', '한쪽에서 선택을 안했음')
      } else {
        if(answers[0] === answers[1]) {
          io.to(room).emit('markQuiz', '일치');
        } else {
          io.to(room).emit('markQuiz', '불일치');
        }
      }
      answers = [];
    }
  })

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    if(user) {
      console.log(`${user.animal} has left.`)
    }
    else {
      console.log('disconnect');
    }
    console.log(getAllUsers());
  })
});

app.use(cors());

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));