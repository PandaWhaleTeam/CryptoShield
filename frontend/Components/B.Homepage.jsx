import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import PreviewCard from './C.PreviewCard';
import Select from 'react-select';

const HeartIcon = styled.div`
  width: 50px;
  height: 50px;
  background-color: ${props => (props.clicked ? 'red' : 'grey')};
  clip-path: path("M12 4.419c-2.826-5.695-11.999-4.064-11.999 3.27 0 7.27 9.903 10.938 11.999 15.311 2.096-4.373 12-8.041 12-15.311 0-7.327-9.17-8.972-12-3.27z");
  cursor: pointer;
  transition: background-color 0.3s;
  position: absolute;
  top: 20px;
  right: 0px;
  
`;

const CardWrapper = styled.div`
  position: relative;
  margin: 10px;
`;

const Container = styled.div`
  background-color: #0f1c3f;
  color: white;
  padding: 125px;
  text-align: center;
`;

const Title = styled.h1`
  justify-content: center;
  font-size: 3rem;
  margin-bottom: 30px;
`;

const SearchBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2c3e50;
  padding: 10px 12px;
  border-radius: 10px;
  width: 400px;
  margin: 20px auto;
`;

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 425px);
  align-items: start;
  justify-content: center;
  overflow-y: auto;
  scrollbar-width: none;
  max-height: 460px;
  max-width: 100%;
`;

const HomePage = () => {
  const [cryptoData, setCryptoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  // this state keeps track of favorited conins (YA)
  const [clickedHearts, setClickedHearts] = useState({});

  const navigate = useNavigate();

  const handleSelectChange = (selectedOption) => {
    if (selectedOption) {
      navigate(`/coinpage/${selectedOption.value}`);
    }
  };

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
          setCryptoData(newArr);
        } else {
          throw new Error(`Error: ${response.status}`);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Format the API response for react-select
    let options = cryptoData.map((coin) => {
      return { value: coin.id, label: coin.name };
    });
    setFilteredData(options);
  }, [searchTerm, cryptoData]);

  useEffect( ()=>{

    async function fetch_fav (){

        try {
            const response = await fetch('/api/getFav', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ userId: 3}), // replace user.id with the actual user ID in future
            });
        
            if (!response.ok) {
              throw new Error('Error adding favorite');
            }
        
            const data = await response.json();
            //return data
            console.log('got Fav successfully:', data);
            if (data[0].fav != null){
                let send_to_clicked = {};
                data[0].fav.forEach(ele=>{
                    send_to_clicked[ele] = true;
                    
                })
                setClickedHearts(send_to_clicked)

            }


          } catch (error) {
            console.error('Error:', error);
          }
    }
    fetch_fav ()
  },[])

  // get triggered when user clicks heart
  const toggleHeart = async (id) => {
    // keep state of all coins eccept for the cliked conin. cliked coin becomes true
   
    setClickedHearts(prevState => (
        {
      ...prevState,
      [id]: !prevState[id], // if conin with the id doesn;t exist in clikedlist, add it 
    }));
    console.log('clickedHearts', clickedHearts)
    // send api request to SB 

    try {
        const response = await fetch('/api/addFav', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId: 3, coinId: id }), // replace user.id with the actual user ID in future
        });
    
        if (!response.ok) {
          throw new Error('Error adding favorite');
        }
    
        const data = await response.json();
        console.log('Fav added successfully:', data);
      } catch (error) {
        console.error('Error:', error);
      }
  };

  return (
    <Container>
      <Title>CryptoShield</Title>

      <CardContainer>
        {cryptoData.map((crypto, index) => (
          <CardWrapper key={index}>
            <Link to={`/coinpage/${crypto.id}`} style={{ textDecoration: 'none' }}>
              <PreviewCard
                name={crypto.name}
                price={crypto.price}
                logo={crypto.logo}
                rank={index + 1}
                symbol={crypto.symbol}
              />
            </Link>
            <HeartIcon
              // 
              clicked={!!clickedHearts[crypto.id]}
              onClick={() => toggleHeart(crypto.id)}
            />
          </CardWrapper>
        ))}
      </CardContainer>

      <SearchBarContainer>
        <div style={{ width: '100%' }}>
          <Select
            styles={{
              menu: (baseStyles) => ({
                ...baseStyles,
                color: 'black',
              }),
            }}
            menuPlacement="auto"
            placeholder="Search"
            options={filteredData}
            value={searchTerm}
            labelKey="name"
            valueKey="name"
            color="black"
            onChange={handleSelectChange}
          />
        </div>
      </SearchBarContainer>
    </Container>
  );
};

export default HomePage;
