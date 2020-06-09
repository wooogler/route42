import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import io from 'socket.io-client';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import CloseButton from '../components/CloseButton';
import AnimalIcon from '../components/AnimalIcon';
import Countdown from '../components/Countdown';
import SelectBoxLeft from '../components/SelectBoxLeft';
import SelectBoxRight from '../components/SelectBoxRight';
import FailBoxLeft from '../components/FailBoxLeft';
import FailBoxRight from '../components/FailBoxRight';

let socket;

export const problems = [
  {q: '당신의 여행 스타일은?', a: '휴양', b: '관광'},
  {q: '선호하는 계절은?', a: '여름', b: '겨울'},
  {q: '좋아하는 음악 장르는?', a: '발라드', b: '힙합'},
  {q: '당신의 성격은?', a: '외향적', b: '내향적'},
  {q: '아침밥은 먹나요?', a: '먹는다', b: '안먹는다'},
  {q: '당신의 히어로는?', a: '아이언맨', b: '캡틴 아메리카'},
  {q: '친구들과 놀러갈땐?', a: '노래방', b: 'PC방'},
  {q: '선택할 수 있다면?', a: '주 4일 근무', b: '하루 6시간 근무'},
  {q: '선호하는 책 형식은?', a: '소설', b: '수필'},
  {q: '더 가보고 싶은 나라는?', a: '유럽', b: '미국'},
]

const Quiz = ({location, match, setResult, setChoices}) => {
  let history = useHistory();
  const {station} = match.params;
  const ENDPOINT = 'localhost:5000';
  const [animal, setAnimal] = useState('');
  const [other, setOther] = useState(null);
  const [arrival, setArrival] = useState('');
  const [choice, setChoice] = useState('');
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

    socket.emit('join', {animal, room, station}, (error) => {
      if(error) {
        alert(error);
      }
    })

    return () => {
      socket.disconnect();
    }
  }, [ENDPOINT, location.search])

  useEffect(() => {
    socket.on('joined', (joinedUser) => {
      console.log('station: ',station);
      setOther(
        joinedUser.filter(user => {
          return user.station !== station;
        })[0]
      );
    })
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(state => state-1)
    }, 1000);

    socket.on('joined', (joinedUser) => {
      setOther(
        joinedUser.filter(user => {
          return user.station !== station;
        })[0]
      );
    })
    socket.on('markQuiz', (mark) => {
      setMarked(mark);
    })
    
    return () => {
      clearInterval(timer);
    }
  }, [])

  useEffect(() => {
    
    if(time === 3) {
      setIsQuiz(false);
      if(choice==='') {
        socket.emit('sendAnswer', {room, choice: 'a', station});
      }
    }
    if(time === -1) {
      setTime(8);
      setIsQuiz(true);
      setQuizIndex(state => state+1);
      setResult(state => [...state, marked]);
      setChoices(state => [...state, choice]);
      setChoice('');
    }
  }, [time])

  useEffect(() => {
    if(quizIndex === 10) {
      history.push(`/${station}/result?animal=${animal}&arrival=${arrival}`);
    }
  }, [quizIndex]);
  
  const handleClickA = () => {
    setChoice('a');
    console.log(choice);
    socket.emit('sendAnswer', {room, choice:'a', station});
  }

  const handleClickB = () => {
    setChoice('b');
    socket.emit('sendAnswer', {room, choice:'b', station});
  }

  return (
    <PageContainer>
      <Header>
        <AvatarContainer>
          {isQuiz && other?.animal && <AnimalIcon animal={other.animal} size='150'/>}
        </AvatarContainer>
        <CloseButton station={station}/>
        <AvatarContainer>
          {isQuiz && animal && <AnimalIcon animal={animal} size='150'/>}
        </AvatarContainer>
      </Header>
      {
        isQuiz ?
        <>
        <QuestionContainer>
          <Question>
            {problems[quizIndex]?.q}
          </Question>
        </QuestionContainer>
        <Countdown>{time-3}</Countdown>
        <SelectBoxContainer>
          <SelectBoxLeft checked={choice==='a'} onClick={handleClickA}>{problems[quizIndex]?.a}</SelectBoxLeft>
          <SelectBoxRight checked={choice==='b'} onClick={handleClickB}>{problems[quizIndex]?.b}</SelectBoxRight>
        </SelectBoxContainer>
        </> : 
        marked === '일치' ?
        <>
        <AnimalSuccessContainer>
          {other?.animal && <AnimalIcon animal={other.animal} size='150'/>}
          <div style={{width:'40px'}}></div>
          {animal && <AnimalIcon animal={animal} size='150'/>}
        </AnimalSuccessContainer>
        <SuccessContainer>
          {
            choice === 'a' ? 
            <SelectBoxLeft>
              {problems[quizIndex].a}
            </SelectBoxLeft> :
            <SelectBoxRight>
              {problems[quizIndex].b}
            </SelectBoxRight>
          }
          <Success>성공!</Success>
        </SuccessContainer>
        </> : 
        <>
        <FailContainer>
          <LeftContainer>
            {other?.animal && <AnimalIcon animal={other.animal} size='150'/>}
          </LeftContainer>
          <CenterContainer>
            {choice === 'a' ? <FailBoxLeft>{problems[quizIndex].a}</FailBoxLeft> : null}
            <FailBoxRight>{problems[quizIndex].b}</FailBoxRight>
            {choice === 'b' ? <FailBoxLeft>{problems[quizIndex].a}</FailBoxLeft> : null}
          </CenterContainer>
          <RightContainer>
            {animal && <AnimalIcon animal={animal} size='150'/>}
          </RightContainer>
          <Fail>앗...</Fail>
        </FailContainer>
        </>
      }
    </PageContainer>
  )
}

const Fail = styled.div`
  position: absolute;
  bottom: 280px;
  right: 140px;
  font-size: 150px;
  font-family: 'BMJUA';
  color: #FF6B6B;
`

const FailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1008px;
  height:1000px;
`

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 150px;
  height: 600px;
  margin: 0 10px;
`
const CenterContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 490px;
  height: 550px;
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 150px;
  height: 600px;
  margin: 0 10px;
  align-items: flex-end;
`

const Success = styled.button `
  position: absolute;
  top: 420px;
  right: -130px;
  border-radius: 50%;
  background-color: white;
  border:0;
  outline:0;
  color: #FF6B6B;
  font-size: 100px;
  width: 300px;
  height: 300px;
  border: 10px solid #FF6B6B;
  font-family: 'BMJUA';
`

const SuccessContainer = styled.div`
  position: relative;
`

const AnimalSuccessContainer = styled.div`
  display: flex;
  width: 1008px;
  justify-content: center;
  margin: 40px 0;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width:1008px;
  height:200px;
`

const AvatarContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height:200px;
  width:150px;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 1008px;
  height: 1310px;
  border-top: 20px solid #00BBFF;
  border-bottom: 20px solid #00BBFF;
`;

const QuestionContainer = styled.div`
  display:flex;
  width: 1008px;
  margin: 70px 0;
  justify-content: center;
`

const Question = styled.div`
  display:flex;
  font-size: 80px;
  font-family: 'BMJUA';
  color: #00BBFF;
`

const SelectBoxContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 1008px;
  margin-top: 100px;
`

export default Quiz;
