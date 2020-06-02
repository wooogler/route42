import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;

const Quiz = ({location, match}) => {
  const {station} = match.params;
  const ENDPOINT = 'localhost:5000';
  const [animal, setAnimal] = useState('');
  const [arrival, setArrival] = useState('');
  const [answer, setAnswer] = useState('');
  const [marked, setMarked] = useState('');
  const room = 'quiz';

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
      socket.emit('Disconnect from Quiz');
      socket.off();
    }
  }, [ENDPOINT, location.search])

  const handleRadioQuiz = (e) => {
    setAnswer(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(answer) {
      socket.emit('sendAnswer', {room, answer}); 
    }
    socket.on('markQuiz', (mark) => {
      setMarked(mark);
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>quiz</div>
        <div>
          <input type="radio" name="quiz" value="A" onChange={handleRadioQuiz}/>
          <input type="radio" name="quiz" value="B" onChange={handleRadioQuiz}/>
        </div>
        <button type="submit">Next</button>
        <div>{marked}</div>
      </form>
    </div>
  )
}

export default Quiz;
