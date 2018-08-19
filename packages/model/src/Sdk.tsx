import { Id } from './Id';

/**
 * Represents an SDK that has been built from a plan for a specification.
 */
export interface Sdk {
  /**
   * The ID of the plan the SDK was built for.
   */
  planId: Id;

  /**
   * A URL to a download link for the SDK.
   */
  path: string;
}
