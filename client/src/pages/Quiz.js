import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';

import Problem from '../components/Problem'

let socket;

const problems = [
  {q: 'q1', a: 'a1', b: 'b1'},
  {q: 'q2', a: 'a2', b: 'b2'},
  {q: 'q3', a: 'a3', b: 'b3'},
  {q: 'q4', a: 'a4', b: 'b4'},
  {q: 'q5', a: 'a5', b: 'b5'},
  {q: 'q6', a: 'a6', b: 'b6'},
  {q: 'q7', a: 'a7', b: 'b7'},
  {q: 'q8', a: 'a8', b: 'b8'},
  {q: 'q9', a: 'a9', b: 'b9'},
  {q: 'q10', a: 'a10', b: 'b10'},
]

const Quiz = ({location, match}) => {
  const {station} = match.params;
  const ENDPOINT = 'localhost:5000';
  const [animal, setAnimal] = useState('');
  const [arrival, setArrival] = useState('');
  const [answer, setAnswer] = useState('no answer');
  const [marked, setMarked] = useState('');
  const [quizIndex, setQuizIndex] = useState(0);
  const [time, setTime] = useState(13);
  const [isQuiz, setIsQuiz] = useState(true);
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
      socket.emit('disconnect');
      socket.off();
    }
  }, [ENDPOINT, location.search])

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(state => state-1)
    }, 1000);
    
    return () => {
      clearInterval(timer);
    }
  }, [])

  useEffect(() => {
    if(time === 3) {
      setIsQuiz(false);
      socket.emit('sendAnswer', {room, answer});
      socket.on('markQuiz', (mark) => {
        setMarked(mark);
      })
    }
    if(time === -1) {
      setTime(8);
      setIsQuiz(true);
      setQuizIndex(state => state+1);
      setAnswer('no answer');
    }
  }, [time])

  const handleRadioQuiz = (e) => {
    setAnswer(e.target.value);
  }

  return (
    <div>
      {
        isQuiz ? 
        <div>{time-3}초 남았습니다!</div> :
        <div>통했나요?</div>
      }
      <div>{time}</div>
      
      <Problem problem={problems[quizIndex]} handleRadioQuiz={handleRadioQuiz} />
      <div>선택: {answer}</div>
      {
        isQuiz ? 
        null : 
        <div>{marked}</div>
      }
    </div>
  )
}

export default Quiz;
