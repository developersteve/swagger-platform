import React, { Component } from 'react';

import { Button, Typography, IconButton, TableRow, TableCell } from '@material-ui/core';
import * as Icons from '@material-ui/icons';
import { observable, action } from 'mobx';
import { Observer } from 'mobx-react';

import { HasId } from '@openapi-platform/model';
import { SdkConfig, BuildStatus } from '@openapi-platform/model';
import { Sdk } from '@openapi-platform/model';
import { client } from '../../client';
import { createStyled } from '../createStyled';
import { BuildStatusChip } from './BuildStatusChip';

const Styled: any = createStyled(theme => ({
  sdkConfigItemRow: {
    '& > td': {
      border: 'none',
      padding: [0, theme.spacing.unit],
      '&:last-child': {
        paddingRight: theme.spacing.unit * 3,
      },
      '&:first-child': {
        paddingLeft: theme.spacing.unit * 3,
      },
    },
  },
  sdkConfigStatus: {
    textAlign: 'center',
  },
  // TODO: Regularly used classes like this should be defined somewhere else
  center: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

export interface SdkConfigItemProps extends React.DOMAttributes<HTMLDivElement> {
  sdkConfig: HasId<SdkConfig>;
  onEditSdkConfig: (sdkConfig: HasId<SdkConfig>) => void;
}

/**
 * Very basic information about an SDK configuration.
 * For use in lists, grids, etc.
 */
export class SdkConfigItem extends Component<SdkConfigItemProps> {
  // This is the download path to the most recently created SDK for this config.
  @observable
  private latestSdkUrl?: string;

  @action
  public createSdk = async () => {
    this.props.sdkConfig.buildStatus = BuildStatus.Running;
    try {
      const sdk: HasId<Sdk> = await client
        .service('sdks')
        .create({ sdkConfigId: this.props.sdkConfig.id });

      this.props.sdkConfig.buildStatus = sdk.buildStatus;
      this.latestSdkUrl = sdk.path;
    } catch (err) {
      console.log('omg err');
      console.log(err);

      this.props.sdkConfig.buildStatus = BuildStatus.Fail;
    }
  };

  private onEditSdkConfig = () => {
    this.props.onEditSdkConfig(this.props.sdkConfig);
  };

  private getLatestSdk = async (sdkConfig: HasId<SdkConfig>) => {
    const sdks: Sdk[] = await client.service('sdks').find({
      query: {
        $sort: {
          createdAt: -1,
        },
        sdkConfigId: sdkConfig.id,
      },
    });
    this.latestSdkUrl = sdks.length > 0 ? sdks[0].path : '';
  };

  public render() {
    const { sdkConfig } = this.props;
    if (sdkConfig.buildStatus === BuildStatus.Success) {
      this.getLatestSdk(sdkConfig);
    }
    return (
      <Styled>
        {({ classes }) => (
          <Observer>
            {() => (
              <TableRow classes={{ root: classes.sdkConfigItemRow }}>
                <TableCell>
                  <Typography className={classes.sdkConfigTitle}>
                    {sdkConfig.target}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    className={classes.sdkConfigVersion}
                    variant="body1"
                    color="textSecondary"
                  >
                    {sdkConfig.version}
                  </Typography>
                </TableCell>
                <TableCell classes={{ root: classes.sdkConfigStatus }}>
                  <div className={classes.sdkConfigStatus}>
                    <BuildStatusChip buildStatus={sdkConfig.buildStatus} />
                  </div>
                </TableCell>
                <TableCell numeric>
                  <div className={classes.sdkConfigActions}>
                    {this.latestSdkUrl ? (
                      <IconButton href={this.latestSdkUrl}>
                        <Icons.CloudDownload />
                      </IconButton>
                    ) : null}
                    <IconButton aria-label="Edit" onClick={this.onEditSdkConfig}>
                      <Icons.Edit />
                    </IconButton>
                    <Button
                      size="small"
                      disabled={sdkConfig.buildStatus === BuildStatus.Running}
                      onClick={this.createSdk}
                    >
                      {sdkConfig.buildStatus === BuildStatus.Running
                        ? 'Running...'
                        : 'Run'}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </Observer>
        )}
      </Styled>
    );
  }
}
