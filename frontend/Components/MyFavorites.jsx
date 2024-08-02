import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PreviewCard_dash from './C.PreviewCard_dash';

const Container = styled.div`
  background-color: white;
  color: #0f1c3f;

  padding: 5px;   // 20px
  text-align: center;
  position: relative;
  left: 10px;
  top: 10px;
  border-radius: 10px;
  margin: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  width: 450px;
  height: 530px;



`;

const Content = styled.div`
  // background-color: #1a2e5a;
  background-color: #0f1c3f;
  padding: 10px;
  color: white;
  border-radius: 10px;

  height: calc(100% - 20px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
`;

const CardWrapper = styled.div`
  position: relative;
  margin: 0;

  width: 100px;
`;

const MyFavorites = ({ favData, onCryptoClick }) => {
  return (
    <Container>
      <Content>
        <h2 className='dashboard-subtitle' style={{ color: 'white', paddingLeft: '20px' }}>My Favorites</h2>
        {favData.map((crypto, index) => (
          <CardWrapper key={index}>
            <Link onClick={() => onCryptoClick(crypto.id)} style={{ textDecoration: 'none' }}>
              <PreviewCard_dash
                name={crypto.name}
                logo={crypto.logo}
                symbol={crypto.symbol}
              />
            </Link>
          </CardWrapper>
        ))}
      </Content>
    </Container>
  );
};

export default MyFavorites;
