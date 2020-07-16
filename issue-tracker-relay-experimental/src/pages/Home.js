import React, { Suspense, useCallback } from 'react'
import { usePaginationFragment, usePreloadedQuery } from 'react-relay/hooks'
import graphql from 'babel-plugin-relay/macro'
import Skeleton from 'react-loading-skeleton'
import Link from 'react-concurrent-router/Link'

import PendingIndicator from '../PendingIndicator'
import commentIcon from '../commentIcon.svg'

// an example of pagination implementation with relay hooks
const IssuesList = ({ repository }) => {
  const { data, hasNext, loadNext, isLoadingNext } = usePaginationFragment(
    graphql`
      fragment Home_issues on Repository
        @argumentDefinitions(
          cursor: { type: "String" }
          count: { type: "Int", defaultValue: 10 }
          orderBy: {
            type: "IssueOrder"
            defaultValue: { direction: "DESC", field: "UPDATED_AT" }
          }
          states: { type: "[IssueState!]", defaultValue: ["OPEN"] }
        )
        @refetchable(queryName: "HomeIssuesPaginationQuery") {
        issues(
          after: $cursor
          first: $count
          states: $states
          orderBy: $orderBy
        ) @connection(key: "Issues_issues") {
          edges {
            node {
              id
              number
              title
              comments {
                totalCount
              }
            }
          }
        }
      }
    `,
    repository
  )

  const loadMore = useCallback(() => {
    if (isLoadingNext || !hasNext) return
    loadNext(10)
  }, [isLoadingNext, hasNext, loadNext])

  return (
    <>
      {isLoadingNext ? <PendingIndicator /> : null}
      {data.issues.edges.map(({ node: issue }) => (
        <div className='issue-entry' key={issue.id}>
          <div>
            <Link to={`/issue/${issue.number}`}>{issue.title}</Link>
          </div>
          <div className='issue-comments'>
            {issue.comments.totalCount ? (
              <>
                <img src={commentIcon} alt='comment-icon' />{' '}
                <span>{issue.comments.totalCount}</span>
              </>
            ) : null}
          </div>
        </div>
      ))}
      {hasNext ? (
        <button
          name='load more issues'
          type='button'
          onClick={loadMore}
          disabled={isLoadingNext}
        >
          Load more issues
        </button>
      ) : null}
    </>
  )
}

const Home = ({ prefetched }) => {
  // this component will Suspend until 'usePreloadedQuery' is able to return the data
  const { repository } = usePreloadedQuery(
    graphql`
      query HomeQuery($owner: String!, $name: String!) {
        repository(owner: $owner, name: $name) {
          owner {
            login
          }
          name
          url
          ...Home_issues
        }
      }
    `,
    prefetched.homeQuery
  )

  return (
    <>
      <h1>
        Showing latest updated issues from{' '}
        <a
          href={repository.url}
          target='_blank'
          rel='noopener noreferrer'
          title='View repository on GitHub'
        >
          {repository.owner.login}/{repository.name}
        </a>
      </h1>
      <IssuesList repository={repository} />
    </>
  )
}

// A very naive skeleton implementation, just as a quick inspiration for suspending components.
const HomeSkeleton = () => (
  <>
    <h1>
      <Skeleton width='calc(75vw)' height={33} />
    </h1>
    {Array(10)
      .fill()
      .map((_, index) => (
        <div className='issue-entry' key={index}>
          <div>
            <Skeleton width='calc(50vw)' height={24} />
          </div>
          <div>
            <Skeleton width={45} height={24} />
          </div>
        </div>
      ))}
  </>
)

// Simple wrapper to have a Suspense fallback whilst Home component fetches data
const HomePage = props => (
  <Suspense fallback={<HomeSkeleton />}>
    <Home {...props} />
  </Suspense>
)

export default HomePage
