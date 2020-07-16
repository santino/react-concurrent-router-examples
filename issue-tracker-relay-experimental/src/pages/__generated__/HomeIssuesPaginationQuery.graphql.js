/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
type Home_issues$ref = any;
export type IssueOrderField = "COMMENTS" | "CREATED_AT" | "UPDATED_AT" | "%future added value";
export type IssueState = "CLOSED" | "OPEN" | "%future added value";
export type OrderDirection = "ASC" | "DESC" | "%future added value";
export type IssueOrder = {|
  field: IssueOrderField,
  direction: OrderDirection,
|};
export type HomeIssuesPaginationQueryVariables = {|
  cursor?: ?string,
  count?: ?number,
  orderBy?: ?IssueOrder,
  states?: ?$ReadOnlyArray<IssueState>,
  id: string,
|};
export type HomeIssuesPaginationQueryResponse = {|
  +node: ?{|
    +$fragmentRefs: Home_issues$ref
  |}
|};
export type HomeIssuesPaginationQuery = {|
  variables: HomeIssuesPaginationQueryVariables,
  response: HomeIssuesPaginationQueryResponse,
|};
*/


/*
query HomeIssuesPaginationQuery(
  $cursor: String
  $count: Int = 10
  $orderBy: IssueOrder = {direction: DESC, field: UPDATED_AT}
  $states: [IssueState!] = [OPEN]
  $id: ID!
) {
  node(id: $id) {
    __typename
    ...Home_issues_3mROjk
    id
  }
}

fragment Home_issues_3mROjk on Repository {
  issues(after: $cursor, first: $count, states: $states, orderBy: $orderBy) {
    edges {
      node {
        id
        number
        title
        comments {
          totalCount
        }
        __typename
      }
      cursor
    }
    pageInfo {
      endCursor
      hasNextPage
    }
  }
  id
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "cursor",
    "type": "String"
  },
  {
    "defaultValue": 10,
    "kind": "LocalArgument",
    "name": "count",
    "type": "Int"
  },
  {
    "defaultValue": {
      "direction": "DESC",
      "field": "UPDATED_AT"
    },
    "kind": "LocalArgument",
    "name": "orderBy",
    "type": "IssueOrder"
  },
  {
    "defaultValue": [
      "OPEN"
    ],
    "kind": "LocalArgument",
    "name": "states",
    "type": "[IssueState!]"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id",
    "type": "ID!"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
  }
],
v2 = {
  "kind": "Variable",
  "name": "orderBy",
  "variableName": "orderBy"
},
v3 = {
  "kind": "Variable",
  "name": "states",
  "variableName": "states"
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "__typename",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v6 = [
  {
    "kind": "Variable",
    "name": "after",
    "variableName": "cursor"
  },
  {
    "kind": "Variable",
    "name": "first",
    "variableName": "count"
  },
  (v2/*: any*/),
  (v3/*: any*/)
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "HomeIssuesPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          {
            "args": [
              {
                "kind": "Variable",
                "name": "count",
                "variableName": "count"
              },
              {
                "kind": "Variable",
                "name": "cursor",
                "variableName": "cursor"
              },
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "kind": "FragmentSpread",
            "name": "Home_issues"
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Query"
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "HomeIssuesPaginationQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": null,
        "kind": "LinkedField",
        "name": "node",
        "plural": false,
        "selections": [
          (v4/*: any*/),
          (v5/*: any*/),
          {
            "kind": "InlineFragment",
            "selections": [
              {
                "alias": null,
                "args": (v6/*: any*/),
                "concreteType": "IssueConnection",
                "kind": "LinkedField",
                "name": "issues",
                "plural": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "IssueEdge",
                    "kind": "LinkedField",
                    "name": "edges",
                    "plural": true,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "concreteType": "Issue",
                        "kind": "LinkedField",
                        "name": "node",
                        "plural": false,
                        "selections": [
                          (v5/*: any*/),
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "number",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "kind": "ScalarField",
                            "name": "title",
                            "storageKey": null
                          },
                          {
                            "alias": null,
                            "args": null,
                            "concreteType": "IssueCommentConnection",
                            "kind": "LinkedField",
                            "name": "comments",
                            "plural": false,
                            "selections": [
                              {
                                "alias": null,
                                "args": null,
                                "kind": "ScalarField",
                                "name": "totalCount",
                                "storageKey": null
                              }
                            ],
                            "storageKey": null
                          },
                          (v4/*: any*/)
                        ],
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "cursor",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "PageInfo",
                    "kind": "LinkedField",
                    "name": "pageInfo",
                    "plural": false,
                    "selections": [
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "endCursor",
                        "storageKey": null
                      },
                      {
                        "alias": null,
                        "args": null,
                        "kind": "ScalarField",
                        "name": "hasNextPage",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  }
                ],
                "storageKey": null
              },
              {
                "alias": null,
                "args": (v6/*: any*/),
                "filters": [
                  "states",
                  "orderBy"
                ],
                "handle": "connection",
                "key": "Issues_issues",
                "kind": "LinkedHandle",
                "name": "issues"
              }
            ],
            "type": "Repository"
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "id": null,
    "metadata": {
      "derivedFrom": "Home_issues",
      "isRefetchableQuery": true
    },
    "name": "HomeIssuesPaginationQuery",
    "operationKind": "query",
    "text": "query HomeIssuesPaginationQuery(\n  $cursor: String\n  $count: Int = 10\n  $orderBy: IssueOrder = {direction: DESC, field: UPDATED_AT}\n  $states: [IssueState!] = [OPEN]\n  $id: ID!\n) {\n  node(id: $id) {\n    __typename\n    ...Home_issues_3mROjk\n    id\n  }\n}\n\nfragment Home_issues_3mROjk on Repository {\n  issues(after: $cursor, first: $count, states: $states, orderBy: $orderBy) {\n    edges {\n      node {\n        id\n        number\n        title\n        comments {\n          totalCount\n        }\n        __typename\n      }\n      cursor\n    }\n    pageInfo {\n      endCursor\n      hasNextPage\n    }\n  }\n  id\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = 'bfcb3406832bbadcd038be8d8ca5e15d';

module.exports = node;
