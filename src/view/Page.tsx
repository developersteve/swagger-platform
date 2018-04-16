import React, { ComponentType } from 'react';
import { Route, Switch } from 'react-router-dom';
import { observer, Observer } from 'mobx-react';
import classNames from 'classnames';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import Toolbar from 'material-ui/Toolbar';
import * as Icons from '@material-ui/icons';
import { state as navigationState } from 'state/NavigationState';
import { createStyled } from 'view/createStyled';
import { NavigationMenu, drawerWidth } from 'view/NavigationMenu';
import { SettingsViewer } from 'view/SettingsViewer';
import { Overview, OverviewToolbar } from 'view/Overview';
import {
  SpecificationViewer,
  SpecificationViewerToolbar
} from 'view/SpecificationViewer';
import { ProfileViewer, ProfileViewerToolbar } from 'view/ProfileViewer';
import { NotFound, NotFoundToolbar } from 'view/basic/NotFound';

// TODO: Maybe come back to this and see if we can get proper type validation going
const Styled = createStyled(theme => ({
  page: {
    display: 'flex',
    minHeight: '100vh',
    background: theme.palette.background.default
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  toolbarSpacing: {
    ...theme.mixins.toolbar
  },
  menuButton: {
    marginLeft: theme.spacing.unit * 1.5,
    marginRight: theme.spacing.unit * 2.5
  },
  hide: {
    display: 'none'
  },
  content: {
    flexBasis: '600px',
    flexGrow: 1,
    flexShrink: 1,
    paddingTop: 2 * theme.spacing.unit
  }
}));

// Page routes
const routes = [
  {
    exact: true,
    path: '/',
    component: Overview,
    toolbarComponent: OverviewToolbar
  },
  {
    path: '/specifications/:id',
    component: SpecificationViewer,
    toolbarComponent: SpecificationViewerToolbar
  },
  {
    path: '/profiles/:id',
    component: ProfileViewer,
    toolbarComponent: ProfileViewerToolbar
  },
  {
    component: NotFound,
    toolbarComponent: NotFoundToolbar
  }
];

/**
 * The Swagger Platform page
 */
export const Page: ComponentType<{}> = () => (
  <Styled>
    {({ classes }) => (
      <Observer>
        {() => (
          <div className={classes.page}>
            <AppBar
              className={classNames(
                classes.appBar,
                navigationState.drawerOpen && classes.appBarShift
              )}
            >
              <Toolbar disableGutters={!navigationState.drawerOpen}>
                <IconButton
                  color="inherit"
                  aria-label="Open Drawer"
                  onClick={() => navigationState.openDrawer()}
                  className={classNames(
                    classes.menuButton,
                    navigationState.drawerOpen && classes.hide
                  )}
                >
                  <Icons.Menu />
                </IconButton>
                <Switch>
                  {routes.map(({ path, toolbarComponent, exact }, i) => (
                    <Route
                      key={i}
                      path={path}
                      exact={exact}
                      component={toolbarComponent}
                    />
                  ))}
                </Switch>
              </Toolbar>
            </AppBar>
            <nav>
              <NavigationMenu />
            </nav>
            <main className={classes.content}>
              <div className={classes.toolbarSpacing} />
              <Switch>
                {routes.map(({ path, component, exact }, i) => (
                  <Route key={i} path={path} exact={exact} component={component} />
                ))}
              </Switch>
            </main>
          </div>
        )}
      </Observer>
    )}
  </Styled>
);
