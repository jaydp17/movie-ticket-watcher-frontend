import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';

interface Props {
  siteTitle: string;
}
const Header = ({ siteTitle }: Props) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">{siteTitle}</Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
