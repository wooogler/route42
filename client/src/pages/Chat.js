import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import {useHistory} from 'react-router-dom';

let socket;

const Chat = ({location, match}) => {
  const {station} = match.params;
  let history = useHistory();
  const [animal, setAnimal] = useState('');
  const [arrival, setArrival] = useState('');
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [countdown, setCountdown] = useState(null);
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
      console.log('disconnect from Chat');
      socket.disconnect();
    }
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages([...messages, message]);
    })
  }, [messages])

  useEffect(() => {
    socket.on('countdown', (count) => {
      setCountdown(count);
    })
  }, [])

  useEffect(() => {
    if(countdown === 0){
      history.push(`/${station}/quiz?animal=${animal}&arrival=${arrival}`);
    }
  }, [countdown])

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
    <div>count: {countdown}</div>
    {/* <Link to={`/${station}/quiz?animal=${animal}&arrival=${arrival}`}>
      <button>Go to Quiz!</button>
    </Link> */}
    </>
  )
}

export default Chat;