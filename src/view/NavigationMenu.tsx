import React, { SFC } from 'react';
import { Route } from 'react-router-dom';
import { Observer } from 'mobx-react';
import classNames from 'classnames';
import Divider from 'material-ui/Divider';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import * as Icons from '@material-ui/icons';
import { state as profileState } from 'state/ProfileState';
import { state as navigationState } from 'state/NavigationState';
import { createStyled } from 'view/createStyled';

export const drawerWidth = 192;

const Styled = createStyled(theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingLeft: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    ...theme.mixins.toolbar
  },
  navPaper: {
    position: 'relative',
    overflowX: 'hidden',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  navPaperClosed: {
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9
    },
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  }
}));

const NavigationButton = ({ icon, primary, ...other }) => (
  <ListItem button {...other}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={primary} />
  </ListItem>
);

export const NavigationMenu: SFC<{}> = () => (
  <Styled>
    {({ classes }) => (
      <Route
        render={({ history }) => (
          /* TODO: Unfortunately, render callbacks aren't considered with MobX's observer so we have to
          * use the <Observer> syntax. There might be a better way. */
          <Observer>
            {() => (
              <Drawer
                variant="permanent"
                classes={{
                  paper: classNames(
                    classes.navPaper,
                    !navigationState.drawerOpen && classes.navPaperClosed
                  )
                }}
                open={navigationState.drawerOpen}
              >
                <div className={classes.toolbar}>
                  <IconButton
                    aria-label="Close Drawer"
                    onClick={() => navigationState.closeDrawer()}
                  >
                    <Icons.ChevronLeft />
                  </IconButton>
                </div>
                <Divider />
                <List component="nav">
                  <NavigationButton
                    onClick={() => history.push('/')}
                    icon={<Icons.Dashboard />}
                    primary="Overview"
                  />
                  <NavigationButton
                    onClick={() => history.push(`/profiles/${profileState.me.id}`)}
                    icon={<Icons.AccountCircle />}
                    primary="Account"
                  />
                  <NavigationButton
                    onClick={() => history.push('/settings')}
                    icon={<Icons.Settings />}
                    primary="Settings"
                  />
                </List>
              </Drawer>
            )}
          </Observer>
        )}
      />
    )}
  </Styled>
);
