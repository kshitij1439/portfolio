import React from 'react';
import styled from 'styled-components';

const LiveButton = ({ link, label = "Live Now" }) => {
  return (
    <StyledButton href={link} target="_blank" rel="noopener noreferrer">
      <span className="dot"></span>
      {label}
    </StyledButton>
  );
};

const StyledButton = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 10px 25px;
  font-size: 15px;
  font-weight: 600;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  
//   border: 2px solid #ff0000;
  border-radius: 50px;
  text-decoration: none;
  box-shadow: 0 4px 2px rgba(255, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  font-family: 'Roboto', sans-serif;
  margin-top:10px;
  
  &:hover {
    background-color: #ff0000;
    color: #000;
    box-shadow: 0 6px 30px rgba(255, 0, 0, 0.6);
  }

  .dot {
    display: inline-block;
    width: 5px;
    height: 5px;
    margin-right: 10px;
    background-color: #ff0000;
    border-radius: 50%;
    animation: pulse 1.5s infinite;
  }

  @keyframes pulse {
    0%, 100% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.5);
      opacity: 0.7;
    }
  }
`;

export default LiveButton;
