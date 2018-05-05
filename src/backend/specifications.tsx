import { Specification } from 'model/Specification';
import { BuildStatus, Sdk } from 'model/Sdk';

// TODO: Replace this list
const specifications: Specification[] = [
  {
    id: count++,
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
    id: count++,
    title: 'Test',
    description:
      'A test API for testing with a very long description that should truncate when displayed in the list',
    path: 'git.example.com/swagger-specs/test.yaml',
    sdks: [
      { id: 20, name: 'FORTRAN', latestVersion: 'alpha', buildStatus: BuildStatus.FAIL }
    ]
  },
  {
    id: count++,
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
 * @param {string} title - the specification title
 * @param {string} path - path to the swagger specification file
 * @param {string} description - optional specification description
 * @return {Specification} - specification object that was created
 */
export function addSpecification(
  title: string,
  path: string,
  description?: string
): Specification {
  let spec: Specification;

  if (description !== undefined) {
    spec = {
      id: count++,
      title,
      description,
      path,
      sdks: []
    };
  } else {
    spec = { id: count++, title, path, sdks: [] };
  }

  specifications.push(spec);
  return spec;
}

/** Adds an SDK to a specification
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

/** Update an SDK in a specification
 * @param {number} id - the ID of the specification that contains the SDK
 * @param {Sdk} sdk - the updated sdk
 */
export function updateSpecificationSdk(id: number, sdk: Sdk): Specification | undefined {
  let spec: Specification | undefined = getSpecificationById(id);
  if (spec != undefined) {
    let i: number = 0;
    while (i < spec.sdks.length) {
      if (spec.sdks[i].id === sdk.id) {
        spec.sdks[i] = sdk; //replace the existing sdk if the ID's match
      }
      i++;
    }
    return spec;
  } else {
    return undefined;
  }
}

/** Change the attributes of a specification
 * @param {number} id - id of the specification to change
 * @param {string | undefined} newTitle - a new title to update to
 * @param {string | undefined} newUrl  - a new url/path
 * @param {string | undefined} newDescription - a new description
 * @returns {Specification | undefined} - returns the updated specification, or undefined if it didnt exist
 */
export function setSpecificationAttributes(
  id: number,
  newTitle: string | undefined,
  newUrl: string | undefined,
  newDescription: string | undefined
): Specification | undefined {
  let spec: Specification | undefined = getSpecificationById(id);
  if (spec != undefined) {
    let finalTitle: string;
    let finalUrl: string;
    let finalDescription: string | undefined;
    // find title value to use
    if (newTitle != undefined) {
      finalTitle = newTitle;
    } else {
      finalTitle = spec.title;
    }
    //find url value to use
    if (newUrl != undefined) {
      finalUrl = newUrl;
    } else {
      finalUrl = spec.path;
    }
    //find description value to use
    if (newDescription != undefined) {
      finalDescription = newDescription;
    } else {
      finalDescription = spec.description;
    }
    //build the new Specification
    const newSpec: Specification = {
      id: spec.id,
      title: finalTitle,
      path: finalUrl,
      description: finalDescription,
      sdks: spec.sdks
    };
    // find old specification place in list
    let i: number = 0;
    while (i < specifications.length) {
      if (specifications[i].id === id) {
        specifications[i] = newSpec; //replace the old specification
        break;
      }
      i++;
    }
    return newSpec;
  } else {
    return undefined;
  }
}
