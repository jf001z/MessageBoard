import React, { FC } from 'react';
import { Paper } from '@material-ui/core';
import {
  makeStyles,
  Theme,
  createStyles,
  useTheme,
} from '@material-ui/core/styles';
import { Hidden, Drawer, IconButton, AppBar, Toolbar } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { Nav } from '../Nav';

const drawerWidth = 240;
const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up('md')]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      flexShrink: 0,
      [theme.breakpoints.up('md')]: {
        width: '100%',
        display: 'none',
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    content: {
      height: '100%',
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    drawerPaper: {
      width: drawerWidth,
    },
  }),
);

export const Sidebar: FC = () => {
  const classes = useStyle();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        <Hidden smDown implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            <Nav />
          </Drawer>
        </Hidden>
        <Hidden smDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            <Nav />
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};
