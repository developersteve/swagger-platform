import { Specification } from 'model/Specification';
import { BuildStatus, Sdk } from 'model/Sdk';

// TODO: Replace this list
const specifications: Specification[] = [
  {
    id: 0,
    title: 'Birds',
    description: 'A Bird API, for Birds',
    path: 'git.example.com/swagger-specs/birds.yaml',
    sdks: [
      {
        id: 10,
        name: 'Java',
        latestVersion: 'v1.0.34',
        buildStatus: BuildStatus.SUCCESS
      },
      {
        id: 12,
        name: 'Node.js',
        latestVersion: 'v1.0.35',
        buildStatus: BuildStatus.RUNNING
      },
      { id: 11, name: 'Haskell', latestVersion: 'v0', buildStatus: BuildStatus.NOTRUN }
    ]
  },
  {
    id: 1,
    title: 'Test',
    description:
      'A test API for testing with a very long description that should truncate when displayed in the list',
    path: 'git.example.com/swagger-specs/test.yaml',
    sdks: [
      { id: 20, name: 'FORTRAN', latestVersion: 'alpha', buildStatus: BuildStatus.FAIL }
    ]
  },
  {
    id: 2,
    title: 'Swagger API Example Uber',
    description: 'A test API for Uber',
    path:
      'https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v2.0/yaml/uber.yaml',
    sdks: [
      { id: 1, name: 'Python', latestVersion: 'alpha', buildStatus: BuildStatus.SUCCESS },
      { id: 2, name: 'java', latestVersion: 'alpha', buildStatus: BuildStatus.SUCCESS }
    ]
  }
];
let count = specifications.length;

/** Gets a specification with a matching id to what is provided
 * @param {number} id - the id of the specification to fetch
 * @return {Specification | undefined} - returns the Specification with the matching id if it exists
 */
export function getSpecificationById(id: number): Specification | undefined {
  for (const spec of specifications) {
    if (spec.id === id) {
      return spec;
    }
  }
  return undefined;
}

/** Gets all Specifications
 * @return {Specification[]} - returns an array containing all specifications
 */
export function getSpecifications(): Specification[] {
  return specifications;
}

/** Adds a specification to the list
 * @param {string} path - path to the swagger specification file
 * @param {string} titleString - a specification title
 * @param {string} description - optional specification description
 * @return {Specification} - specification object that was created
 */
export function addSpecification(
  path: string,
  titleString: string,
  description?: string
): Specification {
  let spec: Specification;

  if (description) {
    spec = {
      id: count,
      title: titleString,
      description: description,
      path: path,
      sdks: []
    };
  } else {
    spec = { id: count, title: titleString, path: path, sdks: [] };
  }

  specifications.push(spec);
  count++;
  return spec;
}

/**
 * Adds an SDK to a specification
 * @param {number} id - the ID of the specification of which to add the SDK
 * @param {Sdk} sdk - the SDK to add to the specification
 * @return {Specification | undefined} - returns the updated specification, or undefined if the specification does not exist
 */
export function addSdkToSpecification(id: number, sdk: Sdk): Specification | undefined {
  let currentspec: Specification | undefined = getSpecificationById(id);

  if (currentspec != undefined) {
    let sdks: Sdk[] = currentspec.sdks;
    // create an array of the current SDK's ID's
    const ids: number[] = [];
    for (let sdki of sdks) {
      ids.push(sdki.id);
    }
    // find a free id to use
    let i: number = 1;
    while (true) {
      if (!ids.includes(i)) {
        break;
      }
      i++;
    }
    //change sdk id and add to specification
    sdk.id = i;
    currentspec.sdks.push(sdk);
    return currentspec;
  } else {
    return undefined;
  }
}
