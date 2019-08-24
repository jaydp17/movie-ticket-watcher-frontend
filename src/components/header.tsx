import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { graphql, useStaticQuery } from 'gatsby';
import GatsbyImg from 'gatsby-image';
import React from 'react';
import styled from 'styled-components';

const FlexGrow = styled.div`
  flex-grow: 1;
`;

const TitleLink = styled.a`
  text-decoration: none;
  color: inherit;
`;

interface Props {
  siteTitle: string;
}
const Header = ({ siteTitle }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      githubIcon: file(relativePath: { eq: "GitHub-Mark-Light-64px.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      logo: file(relativePath: { eq: "tickets.png" }) {
        childImageSharp {
          fixed(width: 24) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `);
  return (
    <AppBar position="static">
      <Toolbar>
        <a href="/">
          <IconButton edge="start" aria-label="logo" aria-haspopup="true" color="inherit">
            <GatsbyImg fixed={data.logo.childImageSharp.fixed} />
          </IconButton>
        </a>
        <Typography variant="h6">
          <TitleLink href="/">{siteTitle}</TitleLink>
        </Typography>

        <FlexGrow />
        <a href="https://github.com/jaydp17/movie-ticket-watcher-frontend" target="_blank">
          <IconButton edge="end" aria-label="github logo" aria-haspopup="true" color="inherit">
            <GatsbyImg fixed={data.githubIcon.childImageSharp.fixed} />
          </IconButton>
        </a>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
