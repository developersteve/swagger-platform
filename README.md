# openapi-platform
Project in development - Open sourced service overlay for SDK management using swagger-codegen

# Minimum Requirements
- Node 8.x
- PostgreSQL

## Installation
```
npm install --global @openapi-platform/frontend @openapi-platform/server
```
or
```
yarn add global @openapi-platform/frontend @openapi-platform/server
```

## How to use it
1. Run `start-openapi-platform-server`
2. Run `start-openapi-platform-frontend`

### Pushing SDKs to Git repositories
You'll need to generate personal access token (see [GitHub](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/), [GitLab](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html) and [BitBucket](https://confluence.atlassian.com/bitbucketserver/personal-access-tokens-939515499.html))
that has permissions to **clone** and **push** the git repository that you want to push the SDK to.

Note that, at the moment, you'll need to intialise the Git repository before OpenAPI Platform can make commits to it.

## Configuration
You can create a config file in your current working directory called `openapi-platform.config.xxx` where xxx is a `json`, `yaml` or `json5`. 
For more detailed information about configuration, you can check the `node-convict` [schema file](./packages/config/src/schema.ts).
