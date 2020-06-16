const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');

const PORT = process.env.PORT || 5000;

const {addUser, removeUser ,getUser, getAllUsers} = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let answers = ['',''];
let countdown;

io.on('connection', (socket) => {
  socket.on('join', ({animal, room, station}, callback) => {
    const {error, user} = addUser({id: socket.id, animal, station})
    if(error) return callback(error);

    socket.join(room);
    console.log(`${user.animal} come to ${room} room.`)
    const joinedUser = getAllUsers();
    console.log(joinedUser);
    if(room == 'chat') {
      if(joinedUser.length===2 && 
        joinedUser[0].animal !== 'anonymous' && 
        joinedUser[1].animal !== 'anonymous') {
        let count = 38;
        countdown = setInterval(() => {
          if(count==37) {
            io.to(room).emit('joined', joinedUser);
          }
          io.to(room).emit('countdown', count);
          console.log('count:', count);
          count = count - 1;
          if(count === -1) {
            clearInterval(countdown);
          }
        },1000)
      }
    } else if (room == 'quiz') {
      if(joinedUser.length == 2) {
        io.to(room).emit('joined', joinedUser);
      }
    } else {
      callback('room error');
    }
    
  })

  socket.on('sendMessage', ({room, message}, callback) => {
    const user = getUser(socket.id);
    io.to(room).emit('message', {user: user.animal, text: message, station: user.station});

    callback();
  })

  socket.on('sendAnswer', ({room, choice, station}, callback) => {
    if(station === 'station1') {
      answers[0] = choice;
    } else if(station === 'station2') {
      answers[1] = choice;
    } else {
      console.log('station name is only station1 or station2');
    }
    console.log(answers);
    if(answers[0] === '' || answers[1] === '') {
      io.to(room).emit('markQuiz', '한쪽에서 선택을 안했음');
    } else {
      if(answers[0] === answers[1]) {
        io.to(room).emit('markQuiz', '일치');
      } else {
        io.to(room).emit('markQuiz', '불일치');
      }
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
    if(countdown) {
      clearInterval(countdown);
    }
    console.log(getAllUsers());
  })
});

app.use(cors());

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));