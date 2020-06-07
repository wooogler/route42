import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import AnimalIcon from '../components/AnimalIcon';
import ArrivalIcon from '../components/ArrivalIcon';

const Select = ({match}) => {
  const {station} = match.params
  const [arrival, setArrival] = useState('');
  const [animal, setAnimal] = useState('');

  const handleClickGangnam = () => setArrival('gangnam');
  const handleClickSinnonhyeon = () => setArrival('sinnonhyeon');

  const handleClickPig = () => setAnimal('pig');
  const handleClickPanda =() => setAnimal('panda');
  const handleClickGiraffe =() => setAnimal('giraffe');
  const handleClickFox =() => setAnimal('fox');
  const handleClickZebra =() => setAnimal('zebra');
  const handleClickGorilla =() => setAnimal('gorilla');
  const handleClickBear =() => setAnimal('bear');
  const handleClickHamster =() => setAnimal('hamster');
  const handleClickDeer =() => setAnimal('deer');
  const handleClickRabbit =() => setAnimal('rabbit');
  const handleClickMouse =() => setAnimal('mouse');
  const handleClickSquid =() => setAnimal('squid');
  
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
          <AnimalIcon checked={animal==='pig'} onClick={handleClickPig} animal="pig" size="125"/>
          <AnimalIcon checked={animal==='panda'} onClick={handleClickPanda} animal="panda" size="125"/>
          <AnimalIcon checked={animal==='giraffe'} onClick={handleClickGiraffe} animal="giraffe" size="125"/>
          <AnimalIcon checked={animal==='fox'} onClick={handleClickFox} animal="fox" size="125"/>
        </AnimalRow>
        <AnimalRow>
          <AnimalIcon checked={animal==='zebra'} onClick={handleClickZebra} animal="zebra" size="125"/>
          <AnimalIcon checked={animal==='gorilla'} onClick={handleClickGorilla} animal="gorilla" size="125"/>
          <AnimalIcon checked={animal==='bear'} onClick={handleClickBear} animal="bear" size="125"/>
          <AnimalIcon checked={animal==='hamster'} onClick={handleClickHamster} animal="hamster" size="125"/>
        </AnimalRow>
        <AnimalRow>
          <AnimalIcon checked={animal==='deer'} onClick={handleClickDeer} animal="deer" size="125"/>
          <AnimalIcon checked={animal==='rabbit'} onClick={handleClickRabbit} animal="rabbit" size="125"/>
          <AnimalIcon checked={animal==='mouse'} onClick={handleClickMouse} animal="mouse" size="125"/>
          <AnimalIcon checked={animal==='squid'} onClick={handleClickSquid} animal="squid" size="125"/>
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
