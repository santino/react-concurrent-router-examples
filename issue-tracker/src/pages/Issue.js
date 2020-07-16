import React, { useMemo, Suspense } from 'react'
import ReactMarkdown from 'react-markdown'
import Link from 'react-concurrent-router/Link'
// SuspendableResource let you create resources that can suspend rendering
import SuspendableResource from 'react-concurrent-router/SuspendableResource'

// import our fetcher util so we can dispatch a request from a React component
import fetcher from '../fetcher'

const Comment = ({ comment }) => (
  <div className='comment'>
    <div className='comment-author'>
      {comment.user.login} commented on {comment.created_at}
    </div>
    <div className='comment-body'>
      <ReactMarkdown source={comment.body} />
    </div>
  </div>
)

// prefetchedComments.read() will cause the component to suspend until it receives the data.
const Comments = ({ prefetchedComments }) => {
  const comments = prefetchedComments.read()
  return (
    <div className='comments'>
      {comments.length ? (
        comments.map(comment => <Comment key={comment.id} comment={comment} />)
      ) : (
        <div className='no-comments'>no one commented on this issue yet</div>
      )}
    </div>
  )
}

/**
 * We confiured the router to defer the 'issue' prefetch request, so we know that when this
 * component renders we already have the data and so 'issue.read()' won't cause a suspension.
 *
 * This component demonstrates how to use SuspendableResource class exported by the router in your
 * components so you can create suspendable resources with zero effort.
 * This is just a demonstration in case you need to dispatch more fetch request using entities
 * returned by prefetched data; so they couldn't be prefetched given the dependency.
 * In the same way we could potentially use SuspendableResource to import components or load
 * images, for example, or anything else we might want suspend while loading.
 */
const IssuePage = ({ prefetched }) => {
  const issue = prefetched.issue.read()
  const commentsResource = useMemo(
    // the function you pass to SuspendableResource is the same used on route 'prefetch' property
    () => new SuspendableResource(() => fetcher(issue.comments_url)),
    [issue]
  )

  return (
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
      {/* This Suspense boundary will catch Comments suspension and will show the fallback until
       * Comments un-suspends, in this case when prefetchedComments.read() returns the data */}
      <Suspense fallback={'Loading comments...'}>
        <Comments prefetchedComments={commentsResource} />
      </Suspense>
    </>
  )
}

export default IssuePage
