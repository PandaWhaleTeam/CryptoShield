import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import PreviewCard_dash from './C.PreviewCard_dash';
import buttonLogo from '/public/cancel.png';

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


  &::-webkit-scrollbar {
    width: 8px;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &::-webkit-scrollbar-track {
    background: #0f1c3f;
    margin-top: 50px;
    margin-bottom: 50px;
    border-radius: 20px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  // .scrollbar {
  //   scrollbar-width: thin;
  //   scrollbar-color: #888 #0f1c3f;
  // }

   &:hover::-webkit-scrollbar {
    opacity: 1;
  }


`;

const CardWrapper = styled.div`
  position: relative;
  margin: 0;
  width: 100px;
`;

const MyFavorites = ({ favData, onCryptoClick, userId, favorites, setFavorites }) => {
  const handleDelete = async (coinId) => {
    try {
      const response = await fetch('/api/deleteFav', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, coinId }),
      });

      if (response.ok) {
        const updatedFavorites = favorites.filter((fav) => fav !== coinId);
        setFavorites(updatedFavorites); 
        console.log('Favorite deleted successfully');
      } else {
        console.error('Failed to delete favorite');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
                buttonLogo={buttonLogo}
                symbol={crypto.symbol}
                coidId={crypto.id}
                onButtonClick={handleDelete}
              />
            </Link>
          </CardWrapper>
        ))}
      </Content>
    </Container>
  );
};

export default MyFavorites;
