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
        result === '불일치' ?
        <>
        <ResultIndexDiff>{index}</ResultIndexDiff>
        <ResultDiffOther>
          {choice === 'a' ? problems[index].b : problems[index].a}
        </ResultDiffOther>
        <ResultDiffMe>
          {choice === 'a' ? problems[index].a : problems[index].b}
        </ResultDiffMe>
        </> :
        <>
        <ResultIndexNull>{index}</ResultIndexNull>
        <ResultNull>
          한 쪽에서 응답을 안했어요..
        </ResultNull>
        </>
      }
    </ResultContainer>
  )
}

const ResultContainer = styled.div`
  display: flex;
  width: 800px;
  height: 100px;
  justify-content: space-between;
  align-items: center;
`

const ResultIndexSame = styled.button`
  height:60px;
  width: 50px;
  border: 5px solid #00BBFF;
  color: #00BBFF;
  font-size: 40px;
  font-family: 'BMJUA';
  background-color: white;
`

const ResultSame = styled.button`
  height: 65px;
  width: 700px;
  border: 5px solid #00BBFF;
  font-size: 40px;
  font-family: 'BMJUA';
  color: #00BBFF;
  background-color: white;
`

const ResultIndexDiff = styled.button`
  height:60px;
  width: 50px;
  border: 5px solid #FF6B6B;
  color: #FF6B6B;
  font-size: 40px;
  font-family: 'BMJUA';
  background-color: white;
`

const ResultDiffMe = styled.button`
  height: 60px;
  width: 340px;
  border: 5px solid #FF6B6B;
  font-size: 40px;
  font-family: 'BMJUA';
  color: #FF6B6B;
  background-color: white;
`

const ResultDiffOther = styled.button`
  height: 60px;
  width: 340px;
  border: 5px solid #FF6B6B;
  font-size: 40px;
  font-family: 'BMJUA';
  color: #FF6B6B;
  background-color: white;
`

const ResultIndexNull = styled.button`
  height:60px;
  width: 50px;
  border: 5px solid #9B9A9A;
  color: #9B9A9A;
  font-size: 40px;
  font-family: 'BMJUA';
  background-color: white;
`

const ResultNull = styled.button`
  height: 65px;
  width: 700px;
  border: 5px solid #9B9A9A;
  font-size: 40px;
  font-family: 'BMJUA';
  color: #9B9A9A;
  background-color: white;
`

export default ResultItem
