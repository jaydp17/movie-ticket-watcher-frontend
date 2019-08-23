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
    }
  `);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">{siteTitle}</Typography>
        <FlexGrow />
        <a href="https://github.com/jaydp17/bms-notify-frontend" target="_blank">
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
          >
            <GatsbyImg fixed={data.githubIcon.childImageSharp.fixed} />
          </IconButton>
        </a>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
