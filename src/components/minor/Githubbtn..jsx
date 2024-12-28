import React from 'react';
import styled from 'styled-components';

const Button = ({ link }) => {
  return (
    <StyledWrapper>
      <a 
        href={link}
        className="btn-github"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M12 0C5.37 0 0 5.37 0 12c0 5.25 3.438 9.75 8.205 11.34.6.111.82-.26.82-.58v-2.06c-3.338.725-4.04-1.61-4.04-1.61-.548-1.392-1.34-1.768-1.34-1.768-1.092-.748.084-.734.084-.734 1.207.084 1.837 1.238 1.837 1.238 1.07 1.83 2.804 1.304 3.49 1.004.106-.776.42-1.303.766-1.604-2.667-.297-5.468-1.334-5.468-5.91 0-1.31.466-2.38 1.24-3.22-.124-.297-.538-.926.12-1.856 0 0 1.062-.356 3.388 1.284 1.544-.428 3.19-.428 4.734 0 2.326-1.64 3.388-1.284 3.388-1.284.658.93.244 1.559.12 1.856.774.842 1.24 1.91 1.24 3.22 0 4.574-2.801 5.607-5.47 5.91.43.373.816.959.816 1.823v2.03c0 .319.22.69.83.58C20.563 21.75 24 17.25 24 12c0-6.63-5.37-12-12-12z"/>
        </svg>
        <span>View on Github</span>
      </a>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .btn-github {
    cursor: pointer;
    display: flex;
    gap: 0.5rem;
    border: none;
    text-decoration: none; /* Prevent underline */
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    border-radius: 100px;
    font-weight: 800;
    place-content: center;
    padding: 0.75rem 1rem;
    font-size: 0.825rem;
    line-height: 1rem;
    margin: 1rem;
    background-color: rgba(0, 0, 0, 0.4);
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.04),
      inset 0 0 0 1px rgba(255, 255, 255, 0.04);
    color: #fff; /* Ensure the icon color is set */
  }

  .btn-github:hover {
    box-shadow:
      inset 0 1px 0 0 rgba(255, 255, 255, 0.08),
      inset 0 0 0 1px rgba(252, 232, 3, 0.08);
    color: green; /* Change color on hover */
    transform: translate(0, -0.25rem);
    background-color: rgba(0, 0, 0, 0.5);
  }

  /* Ensure SVG is sized and visible */
  .btn-github svg {
    width: 24px; /* Set size */
    height: 24px; /* Set size */
    fill: currentcolor; /* Ensure the SVG uses the button text color */
  }

  .btn-github {
    display: inline-flex;
    align-items: center;
    text-decoration: none; /* Prevent underline */
  }
`;

export default Button;
