import React, { SFC } from 'react';
import { observer } from 'mobx-react';
import Typography from 'material-ui/Typography';
import { state } from 'state/ProfileState';
import { ContentContainer } from 'view/basic/ContentContainer';
import { ProfileInformation } from 'view/basic/ProfileInformation';

// TODO: Add react-router's injected props
export const ProfileViewer: SFC<any> = observer(() => (
  <ContentContainer>
    {
      // Using state.me for now as example data
    }
    <ProfileInformation profile={state.me} />
  </ContentContainer>
));

export const ProfileViewerToolbar: SFC<{}> = () => (
  <div>
    <Typography color="inherit" variant="title">
      Account
    </Typography>
  </div>
);
