import React, { SFC } from 'react';
import { observer } from 'mobx-react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui';
import { state } from 'state/SettingsState';

export const ThemeProvider: SFC<{}> = observer(({ children }) => (
  <MuiThemeProvider
    theme={createMuiTheme({
      palette: {
        type: state.paletteType
      }
    })}
  >
    {children}
  </MuiThemeProvider>
));
