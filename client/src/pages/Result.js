import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import queryString from 'query-string';

import CloseButton from '../components/CloseButton';
import ResultItem from '../components/ResultItem';
import BusInfo from '../components/BusInfo';

const Result = ({ match, result, choices, location}) => {
  const {station} = match.params;
  let history = useHistory();
  const [isResult, setIsResult] = useState(true);
  const [bus, setBus] = useState('');
  const percent = (result.filter(item => item==='일치').length / 8 * 100).toFixed(1);

  useEffect(() => {
    const {bus} = queryString.parse(location.search);
    setBus(bus);
    setTimeout(() => {
      setIsResult(false);
    }, 7000)
  }, [bus, location])

  useEffect(() => {
    if(!isResult) {
      history.push(`/${station}/qr`)
    }
  }, [isResult, history, station])

  return (
    <PageContainer>
      <Header>
        <CloseButton station={station}/>
        <BusInfo bus={bus} min={'1'} />
      </Header>
      <PercentContainer>
        <PercentNumber>{percent}</PercentNumber>
        <Percent>%</Percent>
        <Ilchi>일치</Ilchi>
      </PercentContainer>
      <Review>
        {
          percent > 90 ?
          '와 100% 일치네요!' :
          percent > 70 ?
          '혹시 지인..?' : 
          percent > 50 ?
          '반 이상은 비슷한데요?' :
          percent > 20 ? 
          '좀 아쉽네요.. ㅠㅠ' :
          '이렇게 안 맞을 수가... ㅠㅠ'
        }
      </Review>
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
