import React, { SFC } from 'react';
import Typography from 'material-ui/Typography';

export const NotFound: SFC<{}> = () => <div>Not found</div>;
export const NotFoundToolbar: SFC<{}> = () => (
  <div>
    <Typography color="inherit" variant="title">
      Not Found
    </Typography>
  </div>
);
