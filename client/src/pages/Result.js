import React, {useState, useEffect} from 'react';
import queryString from 'query-string';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';

import CloseButton from '../components/CloseButton';
import ResultItem from '../components/ResultItem';

const Result = ({location, match, result, choices}) => {
  const {station} = match.params;
  let history = useHistory();
  const [animal, setAnimal] = useState('');
  const [arrival, setArrival] = useState('');

  useEffect(() => {
    const {animal, arrival} = queryString.parse(location.search);  
    setArrival(arrival);
    setAnimal(animal);    
  }, [location.search])

  return (
    <PageContainer>
      <Header>
        <CloseButton/>
      </Header>
      <PercentContainer>
        <PercentNumber>{result.filter(item => item==='일치').length * 10}</PercentNumber>
        <Percent>%</Percent>
        <Ilchi>일치</Ilchi>
      </PercentContainer>
      <Review>혹시 지인...?</Review>
      {
        choices.map((choice, index) => {
          return (
            <ResultItem choice={choice} result={result[index]} index={index} />
          )
        })
      }
    </PageContainer>
  )
}

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

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:1008px;
  height:200px;
`

const PercentContainer = styled.div`
  display: flex;
  width: 1008px;
  height: 120px;
  justify-content: center;
  align-items: center;
`
const PercentNumber = styled.span`
  font-size: 140px;
  font-family: 'BMJUA';
  color: #FF6B6B;
`

const Percent = styled.span`
  font-size: 80px;
  font-family: 'BMJUA';
  color: #FF6B6B;
  margin-right: 20px;
`
const Ilchi = styled.span`
  font-size: 80px;
  font-family: 'BMJUA';
  color: #00BBFF;
`

const Review = styled.div`
  font-size: 50px;
  font-family: 'BMJUA';
  color: #BEBEBE;
  margin-bottom: 30px;
`

export default Result;
