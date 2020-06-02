import React, {useState, useEffect} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import io from 'socket.io-client';

let socket;

const Start = ({match}) => {
  const {station} = match.params;
  const ENDPOINT = 'localhost:5000';
  const [message, setMessage] =useState('');

  useEffect(() => {
    socket = io(ENDPOINT);
    
    socket.emit('join', 'anonymous', (error) => {
      if(error) {
        alert(error);
      }
    })

    return () => {
      socket.emit('Disconnect from Start');
      socket.off();
    }
  }, [ENDPOINT]);

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
