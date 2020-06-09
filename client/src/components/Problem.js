import React from 'react';

const Problem = ({problem, station, socket, time}) => {
  const room = 'quiz';
  const handleClickChoice = (choice) => {
    socket.emit('sendAnswer', {room, choice, station});
  }
  return (
    <>
    {
      problem &&
      <div>
        <div>{problem.q}</div>
        <div>
          <Button type={choice==='a' && 'primary'} onClick={handleClickChoice}>{problem.a}</Button>
          <Button type={choice==='b' && 'primary'} onClick={handleClickChoice}>{problem.b}</Button>
        </div>
      </div>
    } 
    </>
  )
}

export default Problem;
