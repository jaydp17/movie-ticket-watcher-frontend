import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import React from 'react';
import styled from 'styled-components';

const FooterSection = styled.footer``;

const Heart = styled.span`
  color: #e25555;
`;

const CenteredPTag = styled.p`
  text-align: center;
  margin: 4px auto;
`;

function Footer() {
  return (
    <FooterSection>
      <Container maxWidth="sm">
        <Divider />
        <CenteredPTag>
          Made with <Heart>&hearts;</Heart> in India
        </CenteredPTag>
        <CenteredPTag>
          © {new Date().getFullYear()}
          {` `}
          <a href="https://jaydp.com">@jaydp17</a>
        </CenteredPTag>
      </Container>
    </FooterSection>
  );
}

export default Footer;
