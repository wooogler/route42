import React from 'react';
import styled from 'styled-components';
import {problems} from '../pages/Quiz';

const ResultItem = ({choice, result, index}) => {
  return (
    <ResultContainer>
      {
        result === '일치' ? 
        <>
        <ResultIndexSame>{index}</ResultIndexSame>
        <ResultSame>
          {choice === 'a' ? problems[index].a : problems[index].b}
        </ResultSame>
        </> :
        <>
        <ResultIndexDiff>{index}</ResultIndexDiff>
        <ResultDiffOther>
          {choice === 'a' ? problems[index].b : problems[index].a}
        </ResultDiffOther>
        <ResultDiffMe>
          {choice === 'a' ? problems[index].a : problems[index].b}
        </ResultDiffMe>
        </>
      }

      
    </ResultContainer>
  )
}

const ResultContainer = styled.div`
  display: flex;
  width: 800px;
  height: 80px;
  justify-content: space-between;
  align-items: center;
`

const ResultIndexSame = styled.button`
  height:65px;
  width: 70px;
  border: 5px solid #00BBFF;
  color: #00BBFF;
  font-size: 50px;
  font-family: 'BMJUA';
  background-color: white;
`

const ResultSame = styled.button`
  height: 65px;
  width: 715px;
  border: 5px solid #00BBFF;
  font-size: 50px;
  font-family: 'BMJUA';
  color: #00BBFF;
  background-color: white;
`

const ResultIndexDiff = styled.button`
  height:65px;
  width: 70px;
  border: 5px solid #FF6B6B;
  color: #FF6B6B;
  font-size: 50px;
  font-family: 'BMJUA';
  background-color: white;
`

const ResultDiffMe = styled.button`
  height: 65px;
  width: 350px;
  border: 5px solid #FF6B6B;
  font-size: 50px;
  font-family: 'BMJUA';
  color: #FF6B6B;
  background-color: white;
`

const ResultDiffOther = styled.button`
  height: 65px;
  width: 350px;
  border: 5px solid #FF6B6B;
  font-size: 50px;
  font-family: 'BMJUA';
  color: #FF6B6B;
  background-color: white;
`

export default ResultItem
