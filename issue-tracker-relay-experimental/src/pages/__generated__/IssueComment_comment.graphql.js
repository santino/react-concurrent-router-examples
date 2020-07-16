/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ReaderFragment } from 'relay-runtime';
import type { FragmentReference } from "relay-runtime";
declare export opaque type IssueComment_comment$ref: FragmentReference;
declare export opaque type IssueComment_comment$fragmentType: IssueComment_comment$ref;
export type IssueComment_comment = {|
  +createdAt: any,
  +body: string,
  +author: ?{|
    +login: string
  |},
  +$refType: IssueComment_comment$ref,
|};
export type IssueComment_comment$data = IssueComment_comment;
export type IssueComment_comment$key = {
  +$data?: IssueComment_comment$data,
  +$fragmentRefs: IssueComment_comment$ref,
  ...
};
*/


const node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "IssueComment_comment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "createdAt",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "body",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "author",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "login",
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Comment"
};
// prettier-ignore
(node/*: any*/).hash = '9fe854b0598702f8c8adff21ccb81460';

module.exports = node;
