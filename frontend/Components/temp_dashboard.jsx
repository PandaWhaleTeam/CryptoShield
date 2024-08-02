import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import PreviewCard_dash from './C.PreviewCard_dash';
import TopNavBar from './TopNavBar';
import CoinPage_dash from './D.CoinPage_dash';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
`;

const DashboardItems = styled.div`
  gap: 10px;
  max-width: 50%;
`;

const CardWrapper = styled.div`
  position: relative;
  margin: 10px;
`;

const CoinPageContainer = styled.div`
  flex: 1;
  margin: 10px;
`;

const DashBoard = () => {
    const [userFav, changeUserFav] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [cryptoData_fav, setCryptoData_fav] = useState([]);
    const [favData, setfavData] = useState([]);
    const [selectedCrypto, setSelectedCrypto] = useState(null);
    const navigate = useNavigate();

    if (storedUserId == 'undefined'){navigate('/login')}



    useEffect(() => {
        async function fetch_fav() {
            try {
                const response = await fetch('/api/getFav', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ userId: storedUserId }), // replace user.id with the actual user ID in future
                });

                if (!response.ok) {
                  throw new Error('Error adding favorite');
                }

                const data = await response.json();
                if (data[0].fav == null) data[0].fav = [];

                changeUserFav(data[0]);
                console.log('got Fav successfully in dashboard:', data);

                
              } catch (error) {
      
                changeUserFav({fav :[]});
                console.error('Error:', error);
              }
        }
        fetch_fav();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('/api/coins', {
              method: 'GET',
            });
            if (response.ok) {
              const data = await response.json();
              console.log('data: ', data);
              const newArr = data.coinList.data.items;
              setCryptoData_fav(newArr);
            } else {
              throw new Error(`Error: ${response.status}`);
            }
          } 
          catch (error) {
            console.error(error.message);
          }
        };
        fetchData();
    }, []);

    useEffect(() => {
        let options = cryptoData_fav.map((coin) => {
          return { value: coin.id, label: coin.name };
        });
        setfavData(options);
    }, [cryptoData_fav]);

    useEffect(() => {
        if (userFav.fav) {
            const filtered = cryptoData_fav.filter(crypto => userFav.fav.includes(crypto.id));
            setfavData(filtered);
            
        } else { setfavData([]);}
    }, [cryptoData_fav, userFav]);

    const display = (id) => {
        setSelectedCrypto(id);
    };

  return (
    <div>
            <TopNavBar />
            <h1 style={{ color: 'white' }}>Welcome {storedUsername}</h1>
            <DashboardContainer>
            <DashboardItems>
            <h2 style={{ color: 'white' }}>My Favorites</h2>
                    {favData.map((crypto, index) => (
                        <CardWrapper key={index}>
                            <Link onClick={() => display(crypto.id)} style={{ textDecoration: 'none' }}>
                                <PreviewCard_dash
                                    name={crypto.name}
                                    logo={crypto.logo}
                                    symbol={crypto.symbol}
                                />
                            </Link>
                        </CardWrapper>
                    ))}
                </DashboardItems>
                {selectedCrypto && (
                    <CoinPageContainer>
                        <CoinPage_dash id={selectedCrypto}></CoinPage_dash>
                    </CoinPageContainer>
                )}
            </DashboardContainer>
        </div>
    );
};



export default DashBoard;
