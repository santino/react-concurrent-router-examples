import React, { useCallback } from 'react'
import {
  useFragment,
  usePaginationFragment,
  usePreloadedQuery
} from 'react-relay/hooks'
import graphql from 'babel-plugin-relay/macro'
import ReactMarkdown from 'react-markdown'
import Link from 'react-concurrent-router/Link'
import PendingIndicator from '../PendingIndicator'

// Comment define its data requirements that are common to the initial issue post and all oher comments
const Comment = props => {
  const comment = useFragment(
    graphql`
      fragment IssueComment_comment on Comment {
        createdAt
        body
        author {
          login
        }
      }
    `,
    props.comment
  )

  return (
    <div className='comment'>
      <div className='comment-author'>
        {comment.author.login} commented on {comment.createdAt}
      </div>
      <div className='comment-body'>
        <ReactMarkdown source={comment.body} />
      </div>
    </div>
  )
}

// an example of pagination implementation with relay hooks
const Comments = ({ issue }) => {
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment IssueComments_issue on Issue
        @argumentDefinitions(
          cursor: { type: "String" }
          count: { type: "Int", defaultValue: 10 }
        )
        @refetchable(queryName: "IssueCommentsQuery") {
        comments(after: $cursor, first: $count)
          @connection(key: "IssueComments_comments") {
          edges {
            node {
              id
              ...IssueComment_comment
            }
          }
        }
      }
    `,
    issue
  )

  const loadMore = useCallback(() => {
    if (isLoadingNext || !hasNext) return
    loadNext(10)
  }, [isLoadingNext, hasNext, loadNext])

  if (!data.comments.edges.length) {
    return <div className='no-comments'>no one commented on this issue yet</div>
  }

  return (
    <>
      {isLoadingNext ? <PendingIndicator /> : null}
      <div className='comments'>
        {data.comments.edges.map(({ node }) => (
          <Comment key={node.id} comment={node} />
        ))}
      </div>
      {hasNext ? (
        <button
          name='load more issues'
          type='button'
          onClick={loadMore}
          disabled={isLoadingNext}
        >
          Load more comments
        </button>
      ) : null}
    </>
  )
}

const IssuePage = ({ prefetched }) => {
  // this component will Suspend until 'usePreloadedQuery' is able to return the data
  const {
    repository: { issue }
  } = usePreloadedQuery(
    graphql`
      query IssueQuery($owner: String!, $name: String!, $number: Int!) {
        repository(owner: $owner, name: $name) {
          issue(number: $number) {
            title
            number
            url
            ...IssueComment_comment
            ...IssueComments_issue
          }
        }
      }
    `,
    prefetched.issueQuery
  )

  return issue ? (
    <>
      <Link to='/'>back to Home</Link>
      <h1>
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={issue.url}
          title='View issue on GitHub'
        >
          #{issue.number}
        </a>{' '}
        {issue.title}
      </h1>
      <Comment comment={issue} /> {/* this is the issue initial post */}
      <Comments issue={issue} /> {/* this will render all other issue comments */}
    </>
  ) : (
    'Issue not found'
  )
}

export default IssuePage
