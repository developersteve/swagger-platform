import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { config } from 'config';
import { generateSdk } from 'client/sdkGeneration';
import { Specification } from 'model/Specification';
import { Sdk } from 'model/Sdk';
import {
  getSpecificationById,
  getSpecifications,
  addSpecification,
  addSdkToSpecification,
  updateSpecificationSdk,
  setSpecificationAttributes
} from 'backend/specifications';

async function run(port: number) {
  const app: express.Express = express();
  app.use(bodyParser.json());

  // Enables CORS requests if configured to do so
  if (config.backend.useCors) {
    app.use(cors());
  }

  app.get('/', (req, res) => {
    res.json({
      status: 'Success',
      message: 'It works!'
    });
  });

  /** API method to generate an sdk for a given specification
   * @param {number} req.body.id - ID of the specification to generate the SDK for
   * @return {Promise<string>} - The URL that the SDK can be downloaded from
   */
  app.post('/generatesdk', async (req, res) => {
    const specificationId: number = req.body.id;
    var spec: Specification | undefined = getSpecificationById(specificationId);

    if (spec != undefined) {
      const sdkUrl: String = await generateSdk(spec);
      res.json({
        status: 'success',
        url: sdkUrl
      });
    } else {
      res.json({
        status: 'failure'
      });
    }
  });

  /** API Method to add a specification
   * @param {string} req.body.title - the title of specification
   * @param {string} req.body.path - the path to the specification file
   * @param {string} req.body.description - optional description of the specification
   * @return {Promise<Specification>} - The Specification that was created
   */
  app.post('/addspecification', async (req, res) => {
    const title: string = req.body.title;
    const path: string = req.body.path;
    const description: string | undefined = req.body.description;
    let spec: Specification = addSpecification(title, path, description);
    res.json(spec);
  });

  /** API Method to return the list of specifications
   * @return {Promise<Specification[]>} - The array of stored Specifications
   */
  app.post('/getspecifications', async (req, res) => {
    res.json(getSpecifications());
  });

  /** API Method to add an SDK to a Specification
   * @param {number} req.body.id - the id of the specification
   * @param {Sdk} req.body.sdk - the sdk to add to the specification
   * @return {Promise<Specification>} - the updated specification
   */
  app.post('/addsdktospecification', async (req, res) => {
    const id: number = req.body.id;
    const sdk: Sdk = req.body.sdk;
    const updatedSpec: Specification | undefined = addSdkToSpecification(id, sdk);
    if (updatedSpec != undefined) {
      res.json({
        status: 'success',
        specification: updatedSpec
      });
    }
    res.json({ status: 'failure' });
  });

  /** API Method to edit an existing SDK config in a specification
   * @param {number} req.body.specId - the id of the specification that owns the sdk
   * @param {Sdk} req.body.newSdk - the updated SDK, id should not be changed
   * @return {Specification} - the updated specification
   */
  app.post('/updatespecificationsdk', async (req, res) => {
    const id: number = req.body.id;
    const sdk: Sdk = req.body.sdk;
    const updatedSpec: Specification | undefined = updateSpecificationSdk(id, sdk);
    if (updatedSpec != undefined) {
      res.json({
        status: 'success',
        specification: updatedSpec
      });
    }
    res.json({ status: 'failure' });
  });

  /** API Method to change the title and URL of a specification
   * @param {number} req.body.id - the id of the specification that is being changed
   * @param {string | undefined} req.body.title - a new title for the specification
   * @param {string | undefined} req.body.url - a new url for the specification
   * @param {string | undefined} req.body.description - a new description for the specification
   * @returns {Specification} - the updated specification
   */
  app.post('/updatespecification', async (req, res) => {
    const id: number = req.body.id;
    const title: string | undefined = req.body.title;
    const url: string | undefined = req.body.url;
    const description: string | undefined = req.body.description;
    let spec: Specification | undefined = setSpecificationAttributes(
      id,
      title,
      url,
      description
    );
    if (spec != undefined) {
      res.json({
        status: 'success',
        specification: spec
      });
    } else {
      res.json({
        status: 'failure'
      });
    }
  });

  app.listen(port);
}
const envPort: string | undefined = process.env.PORT;
const port: number = envPort ? Number.parseInt(envPort) : config.backend.port;
run(port);
