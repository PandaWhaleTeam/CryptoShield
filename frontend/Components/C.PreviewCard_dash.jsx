import React, { useState } from 'react';
import styled from 'styled-components';

const CardStyle = styled.section`
  height: 50px;
  width: 400px;
  margin: 12px;
  box-shadow: 10px 10px 5px rgba(255, 255, 255, 0.5);
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: center;
  justify-content: center;
  background-color: white;
  border-radius: 10px;
  color: black;
  transition: transform 0,3s ease, box-shadow 0.3s ease;


  &:hover {
    transform: scale(1.06);
    box-shadow: 12px 12px 7px rgba(255, 255, 255, 0.5);
    background-color: #c6cbec
  }
`;


// const Name = styled.h3`
// margin-left: 15px;
// `;

const Logo_dash = styled.img`
  height: 35px;
  width: 35px;
  // margin-top: 18px;
  // margin-right: 10px;
  // margin-bottom: 20px;
  // margin-left: 20px;
  margin: 18px 10px 20px 20px;
`;

const Name = styled.h3`
  flex-grow: 1;
  margin-left: 10px;
  margin-right: 30px;

  text-align: center;
`;


const ButtonLogo = styled.img`
  height: 20px;
  width: 20px;
  margin-right: 15px;
  cursor: pointer;
  flex-shrink: 0;

  border-radius: 50%;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b6b3b3;
    transform: scale(1.1);
  }
`;


const PreviewCard_dash = ({ name, logo, buttonLogo, onButtonClick, coinId }) => { // Added onClick prop
  const [checked, setChecked] = useState(false);



  // const handleSelect = (event) => {
  //   event.stopPropagation(); //allows click on select btn w/o triggering whole card click
  //   setChecked(!checked);
  // };

  return (
    <CardStyle className='previewCard_dash'>
      <Logo_dash src={logo} alt={`${name} logo`} />
      <Name>{name}</Name>
      <ButtonLogo
        src={buttonLogo}
        alt={`${name} button logo`}
        onClick={e => {
          e.stopPropagation();
          if (onButtonClick) onButtonClick(coinId);
        }}
        />
    </CardStyle>
  );
};

export default PreviewCard_dash;

//<Price><b>Active Price:</b> ${Number(price.toFixed(2)).toLocaleString('en-US')}</Price>
