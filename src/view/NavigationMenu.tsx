import React, { SFC } from 'react';
import { Route } from 'react-router-dom';
import { Observer } from 'mobx-react';
import { ListItem, ListItemIcon, ListItemText } from 'material-ui';
import Divider from 'material-ui/Divider';
import List from 'material-ui/List';
import * as Icons from '@material-ui/icons';
import { state as profileState } from 'state/ProfileState';
import { state as navigationState } from 'state/NavigationState';

const NavigationButton = ({ icon, primary, ...other }) => (
  <ListItem button {...other}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={primary} />
  </ListItem>
);

export const NavigationMenu: SFC<{}> = () => (
  <Route
    render={({ history }) => (
      /* TODO: Unfortunately, render callbacks aren't considered with MobX's observer so we have to
       * use the <Observer> syntax. There might be a better way. */
      <Observer>
        {() => (
          <div>
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
          </div>
        )}
      </Observer>
    )}
  />
);
