/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import Container from '@material-ui/core/Container';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { graphql, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Footer from './footer';
import Header from './header';
import './layout.css';

const Main = styled.main`
  padding-top: 32px;
  flex: 1;
`;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`;

const FullHeightContainer = styled(Container)`
  flex: 1;
`;

const theme = createMuiTheme({
  palette: {
    primary: { main: '#1D1033' },
    secondary: { main: '#e53935' },
  },
});

interface Props {
  children: any;
}
const Layout = ({ children }: Props) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <ThemeProvider theme={theme}>
      <Root>
        <Header siteTitle={data.site.siteMetadata.title} />
        <FullHeightContainer maxWidth="sm">
          <Main>{children}</Main>
        </FullHeightContainer>
        <Footer />
      </Root>
    </ThemeProvider>
  );
};

export default Layout;
