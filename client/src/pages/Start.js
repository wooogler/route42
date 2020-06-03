import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';

let socket;

const Start = ({match}) => {
  const {station} = match.params;
  const ENDPOINT = 'localhost:5000';
  const [message, setMessage] =useState('');
  const room = 'chat';

  useEffect(() => {
    socket = io(ENDPOINT);
    
    socket.emit('join', {animal: 'anonymous', room}, (error) => {
      if(error) {
        alert(error);
      }
    })

    return () => {
      console.log('disconnect from Start');
      socket.disconnect();
    }
  }, []);

  useEffect(()=> {
    socket.on('message', (message) => {
      setMessage(message);
    })
  }, [message]);

  return (
    <div>
      <div>{station}</div>
      {
        message !== '' && <div>{message.user}: {message.text}</div>
      }
      <Link to={`/${station}/select`}>
        <Button>knock</Button>
      </Link>
    </div>
  )
}

const Button = styled.button`
  width: 200px;
  height: 200px;
`

export default Start;
