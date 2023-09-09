// Modal.js
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

// Styled components for the modal
const HeaderWrapper = styled.div`
    background : #153815;
    padding: 10px 100px;
    h1 {
        margin:0;
        color: #fff;
    }
`;

function Header() {
    return (
      <HeaderWrapper>
        <Link to="/">
          <h1>Recco</h1>
        </Link>
      </HeaderWrapper>
    );
}

export default Header;
