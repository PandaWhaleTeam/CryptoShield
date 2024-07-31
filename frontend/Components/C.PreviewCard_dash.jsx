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


const Name = styled.h3`
`;

const Logo_dash = styled.img`
  height: 35px;
  width: 35px;
  margin-top: 18px;
  margin-right: 10px;
  margin-bottom: 20px;
  
`;



const PreviewCard_dash = ({ name, logo}) => { // Added onClick prop
  const [checked, setChecked] = useState(false);



  // const handleSelect = (event) => {
  //   event.stopPropagation(); //allows click on select btn w/o triggering whole card click
  //   setChecked(!checked);
  // };

  return (
    <CardStyle className='previewCard_dash'>

      <Logo_dash src={logo} alt={`${name} logo`} />
      <Name>{name}</Name>
   

    </CardStyle>
  );
};

export default PreviewCard_dash;

//<Price><b>Active Price:</b> ${Number(price.toFixed(2)).toLocaleString('en-US')}</Price>
