import React, { SFC } from 'react';
import { observer } from 'mobx-react';
import Typography from 'material-ui/Typography';
import { SpecificationList } from 'basic/SpecificationList';
import { state } from 'state/SpecificationState';
import { ContentContainer } from 'basic/ContentContainer';

/**
 * An overview of the current state of Swagger Platform.
 * Includes, for example, a list of all the specications registered on the platform.
 */
export const Overview: SFC<{}> = observer(({ history }) => (
  <ContentContainer>
    <SpecificationList
      specifications={state.specificationList}
      expandedSpecificationId={state.expandedSpecificationId}
      // Expands/collapses a specification
      onSpecificationExpanded={id => (state.expandedSpecificationId = id)}
      // Go to the specification viewing route when you select a specification
      onSpecificationSelected={specification =>
        history.push(`/specifications/${specification.id}`)
      }
    />
  </ContentContainer>
));

export const OverviewToolbar: SFC<{}> = () => (
  <div>
    <Typography color="inherit" variant="title">
      Overview
    </Typography>
  </div>
);
