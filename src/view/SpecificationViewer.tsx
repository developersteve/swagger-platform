import React, { SFC } from 'react';
import { observer } from 'mobx-react';
import Typography from 'material-ui/Typography';
import { state } from 'state/SpecificationState';
import { ContentContainer } from 'view/basic/ContentContainer';
import { SpecificationInformation } from 'view/basic/SpecificationInformation';

// TODO: Fix the prop types for this
export const SpecificationViewer: SFC<any> = observer(({ match }) => {
  const specification = state.specifications.get(match.id);
  // TODO: Probably show something if we couldn't find a specification
  return specification ? (
    <SpecificationInformation specification={specification} />
  ) : null;
});

export const SpecificationViewerToolbar: SFC<{}> = () => (
  <div>
    <Typography color="inherit" variant="title">
      View Specification
    </Typography>
  </div>
);
