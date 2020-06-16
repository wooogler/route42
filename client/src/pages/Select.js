import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import AnimalIcon from '../components/AnimalIcon';
import BusNumberIcon from '../components/BusNumberIcon';

const Select = ({match}) => {
  let history = useHistory();
  const {station} = match.params;
  const [bus, setBus] = useState('');
  const [animal, setAnimal] = useState('');

  useEffect(() => {
    if(animal && bus) {
      setTimeout(()=> {
        history.push(`/${station}/chat?animal=${animal}&bus=${bus}`)
      }, 1000)
    }
  }, [animal, bus, history, station])

  const handleClickBus = (busNumber) => setBus(busNumber);

  const handleClickAnimal = (animal) => setAnimal(animal);
  
  return (
    <PageContainer>
      <SelectText>몇 번 버스를 타시나요?</SelectText>
        <BusContainer>
          <BusRow>
            <BusNumberIcon checked={bus==='51'} onClick={handleClickBus} number={'51'} color='#48B01B'/>
            <BusNumberIcon checked={bus==='55'} onClick={handleClickBus} number={'55'} color='#03AFBD'/>
            <BusNumberIcon checked={bus==='5001'} onClick={handleClickBus} number={'5001'} color='#FF461E'/>
            <BusNumberIcon checked={bus==='8342'} onClick={handleClickBus} number={'8342'} color='#7094E2'/>
          </BusRow>
        </BusContainer>
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

const BusContainer = styled.div`
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

const BusRow = styled.div`
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
