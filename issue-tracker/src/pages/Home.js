import React, { Suspense } from 'react'
import Link from 'react-concurrent-router/Link'
import Skeleton from 'react-loading-skeleton'
import commentIcon from '../commentIcon.svg'

// A very naive skeleton implementation, just as a quick inspiration for suspending components.
const IssuesListSkeleton = ({ count }) =>
  Array(count)
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
    ))

const IssuesList = props => {
  // this component will Suspend until issues.read() is able to return the data
  const issues = props.issues.read()

  return issues.map(issue => (
    <div className='issue-entry' key={issue.id}>
      <div>
        <Link to={`/issue/${issue.number}`}>{issue.title}</Link>
      </div>
      <div className='issue-comments'>
        {issue.comments ? (
          <>
            <img src={commentIcon} alt='comment-icon' />{' '}
            <span>{issue.comments}</span>
          </>
        ) : null}
      </div>
    </div>
  ))
}

const HomePage = ({ prefetched }) => {
  // this component will Suspend until repository.read() is able to return the data
  const repository = prefetched.repository.read()

  return (
    <>
      <h1>
        Showing latest updated issues from{' '}
        <a
          href={repository.html_url}
          target='_blank'
          rel='noopener noreferrer'
          title='View repository on GitHub'
        >
          {repository.full_name}
        </a>
      </h1>
      {/* This Suspense boundary will catch IssuesList suspension and will show the fallback
       * until IssuesList un-suspends; in this case when issues.read() returns the data */}
      <Suspense fallback={<IssuesListSkeleton count={15} />}>
        <IssuesList issues={prefetched.issues} />
      </Suspense>
    </>
  )
}

export default HomePage
