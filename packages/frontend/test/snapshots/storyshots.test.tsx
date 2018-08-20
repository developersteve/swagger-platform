import { createMount } from '@material-ui/core/test-utils';
import initStoryshots from '@storybook/addon-storyshots';
import registerRequireContextHook from 'babel-plugin-require-context-hook/register';
// Required because Storybook uses require.context but this file is not run through Webpack
import { join } from 'path';

registerRequireContextHook();

initStoryshots({
  configPath: join(__dirname, '../../.storybook'),
  /* 
    If you remove this, you end up some rather confusing errors.
    See: https://material-ui.com/guides/testing/ and https://github.com/mui-org/material-ui/issues/9243
  */
  renderer: createMount,
});
