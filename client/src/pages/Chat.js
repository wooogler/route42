import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import {Link} from 'react-router-dom';

let socket;

const Chat = ({location, match}) => {
  const {station} = match.params;
  const [animal, setAnimal] = useState('');
  const [arrival, setArrival] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const room = 'chat';
  const ENDPOINT = 'localhost:5000';

  useEffect(() => {
    const {arrival, animal} = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setArrival(arrival);
    setAnimal(animal);    

    socket.emit('join', {animal, room}, (error) => {
      if(error) {
        alert(error);
      }
    })

    return () => {
      socket.emit('Disconnect from Chat');
      socket.off();
    }
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
  }, [messages])

  const sendMessage = (e) => {
    e.preventDefault();
    if(message) {
      socket.emit('sendMessage', {room, message}, () => setMessage(''));
    }
  }

  return (
    <>
    <div>{station}의 {arrival}가는 {animal}</div>
    {
      messages.map((message, i) => (<div key={i}>{message.user}: {message.text}</div>))
    }
    <form action="submit">
      <input
        type="text"
        value={message}
        onChange={e=>setMessage(e.target.value)}
        onKeyPress={e => e.key === 'Enter' && sendMessage(e)}
      />
      <button onClick={e => sendMessage(e)}>Send</button>
    </form>
    <Link to={`/${station}/quiz?animal=${animal}&arrival=${arrival}`}>
      <button>Go to Quiz!</button>
    </Link>
    </>
  )
}

export default Chat;