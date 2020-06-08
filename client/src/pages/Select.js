import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AnimalIcon from '../components/AnimalIcon';
import ArrivalIcon from '../components/ArrivalIcon';

const Select = ({match}) => {
  let history = useHistory();
  const {station} = match.params;
  const [arrival, setArrival] = useState('');
  const [animal, setAnimal] = useState('');
  const [time, setTime] = useState(0);

  useEffect(() => {
    if(animal && arrival) {
      setTimeout(()=> {
        history.push(`/${station}/chat?animal=${animal}&arrival=${arrival}`)
      }, 1000)
    }
  }, [animal, arrival])

  const handleClickGangnam = () => setArrival('gangnam');
  const handleClickSinnonhyeon = () => setArrival('sinnonhyeon');

  const handleClickAnimal = (animal) => setAnimal(animal);
  
  return (
    <PageContainer>
      <SelectText>어디로 가시나요?</SelectText>
        <ArrivalContainer>
          <ArrivalRow>
            <ArrivalIcon checked={arrival==='gangnam'} onClick={handleClickGangnam} route={2} name='강남' color='#3CB44A'/>
            <ArrivalIcon checked={arrival==='sinnonhyeon'} onClick={handleClickSinnonhyeon} route={9} name='신논현' color='#D1A62C'/>
          </ArrivalRow>
        </ArrivalContainer>
      <SelectText>동물로 당신을 표현해 주세요.</SelectText>
      <AnimalContainer>
        <AnimalRow>
          <AnimalIcon checked={animal==='pig'} onClick={handleClickAnimal} animal="pig" size="125"/>
          <AnimalIcon checked={animal==='panda'} onClick={handleClickAnimal} animal="panda" size="125"/>
          <AnimalIcon checked={animal==='giraffe'} onClick={handleClickAnimal} animal="giraffe" size="125"/>
          <AnimalIcon checked={animal==='fox'} onClick={handleClickAnimal} animal="fox" size="125"/>
        </AnimalRow>
        <AnimalRow>
          <AnimalIcon checked={animal==='zebra'} onClick={handleClickAnimal} animal="zebra" size="125"/>
          <AnimalIcon checked={animal==='gorilla'} onClick={handleClickAnimal} animal="gorilla" size="125"/>
          <AnimalIcon checked={animal==='bear'} onClick={handleClickAnimal} animal="bear" size="125"/>
          <AnimalIcon checked={animal==='hamster'} onClick={handleClickAnimal} animal="hamster" size="125"/>
        </AnimalRow>
        <AnimalRow>
          <AnimalIcon checked={animal==='deer'} onClick={handleClickAnimal} animal="deer" size="125"/>
          <AnimalIcon checked={animal==='rabbit'} onClick={handleClickAnimal} animal="rabbit" size="125"/>
          <AnimalIcon checked={animal==='mouse'} onClick={handleClickAnimal} animal="mouse" size="125"/>
          <AnimalIcon checked={animal==='squid'} onClick={handleClickAnimal} animal="squid" size="125"/>
        </AnimalRow>
      </AnimalContainer>
    </PageContainer>
  )
}

const SelectText = styled.div`
  font-size: 80px;
  font-family: 'BMJUA';
  color: white;
  margin-bottom: 60px;
`

const ArrivalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  height: 100px;
  background-color: white;
  justify-content: space-around;
  align-items: center;
  padding: 30px;
  border: 8px solid #00A1DB;
  margin-bottom: 60px;
`

const ArrivalRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1008px;
  height: 1350px;
  background-color: #00BBFF;
`;

const AnimalContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 720px;
  height: 551px;
  background-color: white;
  justify-content: space-around;
  align-items: center;
  padding: 30px;
  border: 8px solid #00A1DB;
`

const AnimalRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
`

export default Select
