import { BuildStatus } from '@openapi-platform/model';
export async function initDummyData(specs, sdkConfigs): Promise<void> {
  // TODO: Shouldn't the params be typed?
  const addToSpec = async (spec, ...specSdkConfigs) => {
    for (const specSdkConfig of specSdkConfigs) {
      await sdkConfigs.create({
        specId: spec.id,
        ...specSdkConfig,
      });
    }
  };

  await addToSpec(
    await specs.create({
      title: 'Petstore',
      description: 'The example specification by the Swagger/OpenAPI team themselves',
      path: 'http://petstore.swagger.io/v2/swagger.json',
    }),
    {
      target: 'java',
      version: 'v1.0.0',
      buildStatus: BuildStatus.NotRun,
    },
    {
      target: 'python',
      version: 'v1.0.0',
      buildStatus: BuildStatus.NotRun,
    },
    {
      target: 'go',
      version: 'v1.0.0',
      buildStatus: BuildStatus.NotRun,
    },
  );

  const spec0 = await specs.create({
    title: 'OpenAPI Platform',
    description: 'Open sourced service overlay for SDK management using swagger-codegen',
    path: 'localhost:8080/swagger.json',
  });
  await addToSpec(
    spec0,
    {
      target: 'java',
      version: 'v1.0.0',
      buildStatus: BuildStatus.NotRun,
    },
    {
      target: 'python',
      version: 'v1.0.0',
      buildStatus: BuildStatus.NotRun,
    },
    {
      target: 'go',
      version: 'v1.0.0',
      buildStatus: BuildStatus.NotRun,
    },
  );
  const spec1 = await specs.create({
    title: 'Birds',
    description: 'A Bird API, for Birds',
    path: 'git.example.com/swagger-specs/birds.yaml',
  });
  await addToSpec(
    spec1,
    {
      target: 'java',
      version: 'v1.0.34',
      buildStatus: BuildStatus.Success,
    },
    {
      target: 'javascript',
      version: 'v1.0.35',
      buildStatus: BuildStatus.Running,
    },
    {
      target: 'haskell-http-client',
      version: 'v0',
      buildStatus: BuildStatus.NotRun,
    },
  );
  const spec2 = await specs.create({
    title: 'Test',
    description:
      'A test API for testing with a very long description that should truncate when displayed in the list',
    path: 'git.example.com/swagger-specs/test.yaml',
  });
  await addToSpec(spec2, {
    target: 'go',
    version: 'alpha',
    buildStatus: BuildStatus.Fail,
  });
  const spec3 = await specs.create({
    title: 'OpenAPI API Example Uber',
    description: 'A test API for Uber',
    path:
      'https://raw.githubusercontent.com/OAI/OpenAPI-Spec/master/examples/v2.0/yaml/uber.yaml',
  });
  await addToSpec(
    spec3,
    {
      target: 'python',
      version: 'alpha',
      buildStatus: BuildStatus.Success,
    },
    {
      target: 'java',
      version: 'alpha',
      buildStatus: BuildStatus.Success,
    },
  );
}
