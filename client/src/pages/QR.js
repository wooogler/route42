import React from 'react';
import styled from 'styled-components';
import CloseButton from '../components/CloseButton';

const QR = ({match}) => {
  const {station} = match.params;
  return (
    <PageContainer>
      <Header>
        <CloseButton station={station}/>
      </Header>
      <QRImage src='/images/QR.png'/>
      <Instruction>
        상대방과 채팅을 하고 싶으시면 <br/>
        위의 QR코드를 스캔하세요!
      </Instruction>
      <Review>
        주의) 출근 시간에 여기에서만 활성화됩니다. 
      </Review>
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

const QRImage = styled.img`
  width: 400px;
  height: 400px;
  margin-top: 100px;
`

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width:1008px;
  height:200px;
`

const Review = styled.div`
  font-size: 50px;
  font-family: 'BMJUA';
  color: #BEBEBE;
  margin-top: 40px;
`

const Instruction = styled.div`
  font-family: 'BMJUA';
  font-size: 60px;
  color: #00BBFF;
  margin-top : 140px;
  line-height: 70px;
  text-align: center;
`

export default QR;
