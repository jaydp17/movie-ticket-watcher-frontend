import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { graphql, useStaticQuery } from 'gatsby';
import GatsbyImg from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

const FooterSection = styled.footer`
  margin-top: 42px;
`;

const Heart = styled.span`
  color: #e25555;
`;

const CenteredPTag = styled.p`
  text-align: center;
  margin: 4px auto;
`;

const SocialIconsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 200px;
  margin: 20px auto 16px auto;
`;

const SocialIcon = styled(GatsbyImg)`
  opacity: 0.37;
  &:hover {
    opacity: 0.72;
  }
`;

const LinkNoDecor = styled.a`
  text-decoration: none;
  color: inherit;
`;

function Footer() {
  const data = useStaticQuery(graphql`
    query {
      githubIcon: file(relativePath: { eq: "GitHub-Mark-64px.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      twitterIcon: file(relativePath: { eq: "twitter.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      siteIcon: file(relativePath: { eq: "globe.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      linkedInIcon: file(relativePath: { eq: "linkedIn-icon.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  return (
    <FooterSection>
      <Container maxWidth="sm">
        <Divider />
        {/* <CenteredPTag>Reach out 👇</CenteredPTag> */}
        <SocialIconsContainer>
          <a href="https://jaydp.com" target="_blank">
            <SocialIcon fixed={data.siteIcon.childImageSharp.fixed} />
          </a>
          <a href="https://github.com/jaydp17" target="_blank">
            <SocialIcon fixed={data.githubIcon.childImageSharp.fixed} />
          </a>
          <a href="https://twitter.com/jaydp17" target="_blank">
            <SocialIcon fixed={data.twitterIcon.childImageSharp.fixed} />
          </a>
          <a href="https://in.linkedin.com/in/jaydp17" target="_blank">
            <SocialIcon fixed={data.linkedInIcon.childImageSharp.fixed} />
          </a>
        </SocialIconsContainer>
        <CenteredPTag>
          Made with <Heart>&hearts;</Heart> in India
        </CenteredPTag>
        <CenteredPTag>
          © {new Date().getFullYear()}
          {` `}
          <LinkNoDecor href="https://jaydp.com" target="_blank">
            @jaydp17
          </LinkNoDecor>
        </CenteredPTag>
      </Container>
    </FooterSection>
  );
}

export default Footer;
